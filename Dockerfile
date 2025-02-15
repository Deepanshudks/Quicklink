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
COPY backend/src/prisma ./prisma

WORKDIR /usr/src/app/backend

ARG FILEPATH
ENV FILEPATH=${FILEPATH}

# Rebuild bcrypt
# RUN npm rebuild bcrypt --build-from-source

# Generate Prisma Client
# RUN npm install prisma@6.3.1 @prisma/client@6.3.1

# RUN rm -rf node_modules/.prisma
# RUN npm uninstall @prisma/client
# RUN npm install @prisma/client

# # RUN npx prisma migrate deploy --schema=src/prisma/schema.prisma
# RUN npx prisma generate --schema=src/prisma/schema.prisma

# Install Prisma and generate client
RUN npm install prisma@6.3.1 @prisma/client@6.3.1
RUN npx prisma generate --schema=../prisma/schema.prisma

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "backend"]
