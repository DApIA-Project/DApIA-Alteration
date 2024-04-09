FROM node:20-alpine
WORKDIR /usr/src/app
COPY ./server ./server/
COPY ./alteration-scenario ./alteration-scenario/
COPY ./shared ./shared/
COPY ./alteration ./alteration/
RUN apk update && apk add openjdk8
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk
ENV PATH=$JAVA_HOME/bin:$PATH
WORKDIR /usr/src/app/server/
RUN npm install -g typescript
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]