FROM node:alpine3.18 AS build

WORKDIR /app

COPY ./package.json ./tsconfig.json ./package-lock.json ./

RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# Serve with Nginx 

FROM nginx:alpine

# RUN apk update && apk add --no-cache nginx

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo 'add_header Cache-Control "no-cache, no-store, must-revalidate";' >> /etc/nginx/conf.d/default.conf


EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]



