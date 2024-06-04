<h2>JURI CAPITAL</h2>

<h3>Motivação </h3>

Essa aplicação uso como base o padrão de arquitetura em camadas e o paradigma funcional. Mas pela natureza do desafio, se fez necessário adicionar apenas camadas que agregam valor e consequentemente atendem aos requisitos. A solução visa evitar excessos de complexidade e rigidez.

#

<h3>Instruções para executar o projeto </h3>

#

<h4>Executando o projeto (via Docker) </h4>

- dependências: docker e docker-compose

- crie o arquivo **.env** conforme o arquivo **.env.sample** na raiz do projeto

- execute o comando abaixo para subir a aplicação

```zsh
  docker-compose up -d --build
```

#

<h4>Executando o projeto (no seu ambiente local)</h4>

Este projeto sugere o uso do **volta** como gerenciador de ferramentas de linha de comando JavaScript.

segue guia de instalação:
[volta-docs](https://docs.volta.sh/guide/getting-started)

Instale a versão fixada no arquivo **package.json**

```zsh
  volta install node@[version]
```

verificando a instalação

```zsh
  volta list
```

_atenção: todos os comandos a seguir devem ser executados na raiz do projeto._

#

Instale as dependências da aplicação

```zsh
  npm install
```

_nota: você vai precisar de uma instância do **PostgreSQL** rodando em sua máquina (é recomendável a versão 16)._

crie o arquivo **.env** conforme o arquivo **.env.sample** na raiz do projeto

Execute as migrações do banco de dados

```zsh
  npm run migrations
```

Em seguida basta executar o comando abaixo para subir a aplicação

```zsh
  npm run dev:watch
```

#

<h3>Testes unitários</h3>

Execute o comando a seguir para rodar os testes

```zsh
  $ npm run test
```

_A prioridade foi testar as funções puras, especificamente as que realizam operações sensíveis, como manipulação de datas._

#

<h3>Informações complementares</h3>

Você vai encontrar alguns pontos no código-fonte onde faço o uso do tipo _any_, mas não implica dizer que não tentei evitá-los ou deixei de pensar na segurança e solidez de tipo (type safety).

Na raiz do projeto você vai encontrar um arquivo chamado _api-doc.postman.json_. Basta importá-lo no Postman para obter as informações das rotas e realizar os testes funcionais.
