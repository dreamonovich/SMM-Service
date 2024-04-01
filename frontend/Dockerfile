FROM node:alpine AS builder

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm@latest
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine

COPY --from=builder /app/dist/ /var/www/html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx","-g","daemon off;"]