FROM node:alpine3.18 AS build

WORKDIR /app

COPY ./package.json ./tsconfig.json ./package-lock.json ./

RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# Serve with Nginx 

FROM nginx:1.23-alpine

RUN apk update && apk add --no-cache nginx

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=build /app/dist .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]



