FROM node:18.18.0-bullseye AS base

FROM base AS deps

WORKDIR /app

COPY ./package*.json ./
COPY ./packages/frontend/package*.json ./
COPY ./packages/interface/package*.json ./

RUN npm i

FROM base AS builder

WORKDIR /app

COPY  . .

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build:frontend
RUN npm run interface

FROM base AS prod

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder ./packages/frontend/next.config.mjs ./
COPY --from=builder ./packages/frontend/public ./
COPY --from=builder ./packages/frontend/.next/standalone ./
COPY --from=builder ./packages/frontend/.next/static ./next/static

EXPOSE 3000

CMD ["node", "server.js"]