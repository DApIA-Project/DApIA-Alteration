![Server Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/node.js.yml/badge.svg)
![Java Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/java.yml/badge.svg)
![FditScenario Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/fditscenario.yml/badge.svg)
![Client Components React Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/components.yml/badge.svg)

# FDI-T Web

## Generate FDI-T client using Langium

```shell
npm run client
```

## Generate FDI-T server using Langium

```shell
npm run serve
```

## Build FDI-T client Docker image

```shell
npm run docker:build:client
```

## Build FDI-T server Docker image

```shell
npm run docker:build:server
```

## Build FDI-T client/server Docker image

```shell
npm run docker:compose:up
```

# Developer Installation

## Installation in FDI-T-Web

```shell
npm i
```

## Installation in FDI-T-Web/packages/server

```shell
npm i
```

## Installation in FDI-T-Web/packages/client

```shell
npm i
```

## Run client in FDI-T-Web/packages/client

```shell
npm run serve
```

## Run server in FDI-T-Web/packages/server

```shell
npm run start
```

## Copy tools directory in .m2 directory (do this in git bash on windows)

```shell
npm run copy:dependencies:m2
```

# Run Server, Client and Database with docker-compose

## Put the following code in a docker-compose.yml file

```yml
version: '3.8'
name: dapia
services:
  postgres:
    container_name: postgres
    image: postgres:latest
    environment:
      POSTGRES_DB: alterationdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - ./postgres/data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    restart: unless-stopped
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - dapia
  alteration-server:
    container_name: alteration-server
    image: dapiaproject/alteration-server:0.23
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/alterationdb
    ports:
      - '3001:3001'
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - dapia
  alteration-client:
    container_name: alteration-client
    image: dapiaproject/alteration-client:0.32
    environment:
      REACT_APP_BASE_URL: http://localhost:3001
    ports:
      - '3000:3000'
    depends_on:
      alteration-server:
        condition: service_started
    networks:
      - dapia
networks:
  dapia: {}
```

## Execute the following command :

```shell
docker-compose up
```
