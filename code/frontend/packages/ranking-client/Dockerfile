# Build environment
FROM node:12.2.0-alpine as build

# Work dir
WORKDIR /usr/src/app

# Set env values
ENV LOG_LEVEL=debug
ENV NODE_ENV=production

# Add lerna
COPY package.json .
COPY lerna.json .
COPY yarn.lock .

# Copy packages
COPY packages/ranking-client ./packages/ranking-client

# bootstrap
RUN yarn global add lerna
RUN lerna bootstrap --scope=@badvlasim/client -- --production=false --frozen-lockfile

# build
RUN lerna run build:prod --scope=@badvlasim/client

# Run environment
FROM nginx:1.16.0-alpine
COPY --from=build /usr/src/app/packages/ranking-client/dist/client /usr/share/nginx/html
COPY --from=build /usr/src/app/packages/ranking-client/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
