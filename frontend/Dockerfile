FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json

RUN npm i
RUN apk --update --no-cache add curl


COPY src src

COPY tsconfig.json tsconfig.json
COPY codegen.ts codegen.ts


CMD npm run dev & npm run generate
