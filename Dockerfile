# Builder
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN yarn install

COPY . .

RUN yarn run clean
RUN yarn build

# Production
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./dist
