FROM node:16

WORKDIR /my_docker

COPY package*.json ./

RUN npm i

COPY . .


CMD ["npm", "run", "start"]