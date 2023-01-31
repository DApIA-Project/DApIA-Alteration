FROM node:18.12.1 as base

WORKDIR /my_docker

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build