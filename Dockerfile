FROM node:21-slim AS base

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 5000

CMD ["pnpm", "start"]