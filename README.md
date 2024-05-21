<h2>JURI CAPITAL</h2>

<h3>Motivação </h3>

Essa aplicação foi construída com base no padrão de arquitetura em camadas e no paradigma funcional. Mas pela natureza do desafio, se fez necessário adicionar apenas camadas que agregam valor e atendem os requisitos. A solução visa evitar excessos de complexidade e rigídez.

#

<h3>Instruções para executar o projeto</h3>

_Este projeto usa o Volta como gerenciador de ferramentas de linha de comando JavaScript._

Guia de instalação do Volta: [docs-volta](https://docs.volta.sh/guide/getting-started)

Installe a versão fixada no arquivo package.json

```zsh
  volta install node@[version]
```

Verifique a instalação

```zsh
  volta list
```

Instale as dependências execuntando o comando a seguir na raíz do projeto

```zsh
  npm install
```

_atenção: todos os comandos a seguir devem ser executados da raíz do projeto_

Crie o arquivo .env conforme o arquivo .env.sample e execute o comando abaixo para prover os containers da aplicação

```zsh
  docker-compose up -d
```

Execute as migrações do banco de dados

```zsh
  npm run migrations
```

Agora basta subir o servidor com o comando abaixo

```zsh
  npm run dev
```

#

<h3>Testes unitários</h3>

Execute o comando a seguir para rodar os testes unitários

```zsh
  $ npm run test
```

_A prioridade foi testar as funções puras, especificamente as que realizam operações sensíveis, como manipulação de datas._
