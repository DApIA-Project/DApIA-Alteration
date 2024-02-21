FROM node:16-alpine
WORKDIR /usr/src/app
ARG BASE_URL=http://localhost:3001
COPY ./client ./client/
COPY ./alteration-scenario ./alteration-scenario/
COPY ./shared ./shared/
WORKDIR /usr/src/app/client/
RUN npm install -g typescript
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]