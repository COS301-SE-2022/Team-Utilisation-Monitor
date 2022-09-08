FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

#giving errors. Saying it needs yarn install
COPY yarn.lock ./

RUN yarn install

RUN yarn add bcrypt

RUN yarn add -D @types/bcrypt

RUN yarn add @nestjs/cqrs

COPY . .

#do this to compile the main.ts into the main.js file found in the dist folder

RUN yarn prisma generate

RUN yarn run build

CMD ["node","dist/main"]