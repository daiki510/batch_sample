FROM node:16.18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]

# # ビルド環境
# FROM node:16.18 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # 実行環境
# FROM node:16.18-alpine AS production
# WORKDIR /app
# COPY --from=build /app/dist /app
# EXPOSE 3000
# CMD ["node", "server.js"]


# # キャッシュ
# FROM node:16 AS builder

# WORKDIR /workspace

# COPY package.json package-lock.json ./
# # /root/.npm をキャッシュします．
# RUN --mount=type=cache,target=/root/.npm npm install

# COPY public public
# COPY src src
# RUN npm run build

# FROM nginx:stable

# COPY --from=builder /workspace/build /usr/share/nginx/html