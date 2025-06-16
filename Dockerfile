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
RUN npm install -g serve
COPY --from=builder /app/out/ ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
