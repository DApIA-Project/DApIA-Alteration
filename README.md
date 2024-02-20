![Server Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/node.js.yml/badge.svg)
![Java Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/java.yml/badge.svg)
![FditScenario Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/fditscenario.yml/badge.svg)
![Client Components React Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/components.yml/badge.svg)
![Cypress Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/cypress.yml/badge.svg)

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
npm run start
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
alteration-client:
  image: dapiaproject/alteration-client
  environment:
    BASE_URL: http://alteration-server:3001
alteration-server:
  image: dapiaproject/alteration-server
  environment:
    DATABASE_URL: postgresql://postgres:postgres@postgres:5432/alterationdb
postgres:
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
```

## Execute the following command :

```shell
docker-compose up
```
