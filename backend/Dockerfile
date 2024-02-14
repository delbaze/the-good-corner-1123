FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY package.json ./toto.txt
RUN npm i 


RUN apk --update --no-cache add curl

COPY src src
COPY tsconfig.json .


CMD npm run start




















# AVEC MULTI STAGING
# # Première étape : installer les dépendances et compiler le code
# FROM node:lts-alpine AS builder
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY src src
# COPY tsconfig.json .
# RUN npm run build

# # Deuxième étape : exécuter l'application
# FROM node:lts-alpine
# WORKDIR /app
# COPY --from=builder /app/package.json .
# COPY --from=builder /app/dist ./dist
# RUN npm install --production
# CMD npm run startProd