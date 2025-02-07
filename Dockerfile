FROM node:20.12.0-slim

# Install dependencies including Python and build tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openssl \
    libssl-dev \
    python3 \
    python3-pip \
    build-essential && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY ./backend/package.json ./backend/package-lock.json ./backend/tsconfig.json ./

RUN npm install

COPY backend ./backend

WORKDIR /usr/src/app/backend

ARG FILEPATH
ENV FILEPATH=${FILEPATH}

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

# Generate Prisma Client
RUN rm -rf node_modules/.prisma
RUN npm uninstall @prisma/client
RUN npm install @prisma/client
RUN npx prisma generate

RUN npx prisma generate --schema=src/prisma/schema.prisma

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "backend"]
