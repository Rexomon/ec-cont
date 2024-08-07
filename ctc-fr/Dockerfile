FROM oven/bun:1 AS base

WORKDIR /usr/src/app

COPY package.json ./
RUN bun install

COPY . .

ENV NODE_ENV=production

CMD [ "bun", "run", "dev" ]
