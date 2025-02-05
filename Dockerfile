FROM node:20.12.0-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openssl \
    libssl-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY ./backend/package.json ./backend/package-lock.json ./backend/tsconfig.json ./

RUN npm install

COPY backend ./backend

WORKDIR /usr/src/app/backend

ARG FILEPATH
ENV FILEPATH=${FILEPATH}

RUN npm rebuild bcrypt --build-from-source

# RUN npm install -g prisma @prisma/client

RUN npx prisma generate --schema=src/prisma/schema.prisma

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "backend"]
