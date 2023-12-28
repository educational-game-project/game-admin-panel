# Fetching the latest node image on apline linux
FROM node:18.18.2-alpine AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json ./

RUN yarn install
COPY . .
RUN yarn build

FROM nginx

ENV NODE_ENV production
# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf