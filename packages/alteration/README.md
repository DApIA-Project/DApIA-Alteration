![Java Tests workflow](https://github.com/DApIA-Project/FDI-T-Web/actions/workflows/java.yml/badge.svg)
# FDI-T Alteration Engine

## Develop

## Copy tools directory in .m2 directory (do this in git bash on windows)

```shell
mkdir -p $HOME/.m2/repository/com/fdit/ && cp -r ./libs/com/fdit/tools $HOME/.m2/repository/com/fdit/
```

Compile the package:
```shell
mvn compile
```

Run unit tests
```shell
mvn test
```

Install Jar in your local repository `~/.m2`
```shell
mvn install
```