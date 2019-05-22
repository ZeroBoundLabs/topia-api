FROM node:11.15.0-alpine
EXPOSE 3000

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/app

RUN apk --no-cache add --virtual builds-deps build-base python

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm ci

COPY . /home/app

RUN npm run build
