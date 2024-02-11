FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm i 


RUN apk --update --no-cache add curl

COPY src src
COPY tsconfig.json .


CMD npm run start