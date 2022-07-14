FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

#giving errors. Saying it needs yarn install
COPY yarn.lock ./

RUN yarn install

COPY . .

#do this to compile the main.ts into the main.js file found in the dist folder
RUN yarn run build

EXPOSE 8080

CMD ["node","dist/main"]