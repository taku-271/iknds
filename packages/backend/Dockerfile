FROM public.ecr.aws/docker/library/node:18-alpine AS deps

WORKDIR /app

COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/

RUN npm ci

FROM public.ecr.aws/docker/library/node:18-alpine AS builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/backend ./packages/backend

RUN npm run build:backend

FROM public.ecr.aws/docker/library/node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/backend/dist ./packages/backend

EXPOSE $PORT

WORKDIR /app/packages/backend

CMD ["./app.js"]
