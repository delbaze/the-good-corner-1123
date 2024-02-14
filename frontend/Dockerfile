FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json package.json

RUN npm i
RUN apk --update --no-cache add curl


COPY src src
COPY public public

COPY tsconfig.json tsconfig.json

COPY codegen.ts codegen.ts
COPY next.config.js next.config.js


CMD npm run dev & npm run generate
