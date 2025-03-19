# Configuração e Instalação

## Pré-requisitos

- **Node.js** instalado
- **Yarn** instalado (recomendado)
- **Docker** (opcional, para rodar dependências externas)

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/bff-profile.git
   cd bff-profile
   ```

2. Instale as dependências:

   ```sh
   yarn install
   ```

3. Execute a aplicação em modo de desenvolvimento:

   ```sh
   yarn start:dev
   ```

4. Para rodar a aplicação em produção:

   ```sh
   yarn build
   yarn start:prod
   ```

5. Acesse a API:

   - **Swagger UI**: `http://localhost:3000/swagger`
   - **Health Check**: `http://localhost:3000/actuator/health`

## Testes

Para rodar os testes unitários:

```sh
yarn test
```

Para rodar os testes com cobertura:

```sh
yarn test:cov
```

Para rodar testes end-to-end:

```sh
yarn test:e2e
```

## Explicação do comando `test:custom`

O script `test:custom` executa os testes unitários e formata a saída para facilitar a leitura dos resultados. Ele funciona da seguinte forma:

1. Executa `yarn test` e salva a saída no arquivo `test-results.log`.
2. Se houver falhas (`FAIL`), ele exibe as 20 primeiras linhas relevantes e destaca em vermelho.
3. Caso todos os testes passem, ele destaca as informações importantes (`PASS`, `Test Suites:`, etc.) em cores diferentes.

Isso ajuda a identificar rapidamente onde está o problema sem precisar rolar muito no terminal.

## Rodar prepare para pre-commit

```sh
yarn prepare
```

## Bibliotecas Utilizadas

- **[@nestjs/terminus](https://docs.nestjs.com/recipes/terminus)** - Middleware utilizado para monitoramento da aplicação:
  ```
  http://localhost:3000/actuator/health
  ```

- **[Jest](https://www.npmjs.com/package/jest)** - Biblioteca de testes unitários desenvolvida pelo Facebook, conhecida por sua rapidez e confiabilidade.