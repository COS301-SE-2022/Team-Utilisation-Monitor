FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json /app/

COPY yarn.lock /app/

COPY package-lock.json /app/

COPY decorate-angular-cli.js /app/

RUN yarn install

COPY . .

RUN yarn nx build

FROM nginx:1.17.1-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/apps/client/ /usr/share/nginx/html