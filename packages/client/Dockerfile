FROM node:20.12.1-alpine
WORKDIR /usr/src/app
COPY ./client ./client/
COPY ./alteration-scenario ./alteration-scenario/
COPY ./shared ./shared/
WORKDIR /usr/src/app/client/
RUN npm install -g typescript
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]