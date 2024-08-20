FROM node:20.16.0-alpine as builder

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

ENV NODE_ENV=production

RUN npm ci
COPY . .
RUN npm run build

### ------------------------------------ ###

FROM node:20.16.0-alpine as production

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
