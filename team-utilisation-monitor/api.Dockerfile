FROM node:lts-alpine

WORKDIR /app

COPY package*.json /app/

COPY yarn.lock /app/

COPY decorate-angular-cli.js /app/

RUN yarn install

COPY . .

RUN yarn prisma generate

RUN yarn build

CMD yarn start api