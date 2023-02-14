# FDI-T Web

## Generate FDI-T client using Langium

```shell
npm run langium:generate:client
```

## Generate FDI-T server using Langium
```shell
npm run langium:generate:server
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
cd packages ; docker-compose up
```

## Copy tools directory in .m2 directory (do this in git bash on windows)

```shell
sh copy_in_m2.sh
```