FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig*.json ./
RUN npm ci
COPY prisma ./prisma/
RUN npx prisma generate
COPY ./ ./
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm ci --omit=dev --ignore-scripts
ENTRYPOINT ["npm", "run", "start"]
