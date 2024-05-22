<h2>JURI CAPITAL</h2>

<h3>Motivação </h3>

Essa aplicação uso como base o padrão de arquitetura em camadas e o paradigma funcional. Mas pela natureza do desafio, se fez necessário adicionar apenas camadas que agregam valor e consequentemente atendem aos requisitos. A solução visa evitar excessos de complexidade e rigídez.

#

<h3>Instruções para executar o projeto</h3>

_Este projeto usa o Volta como gerenciador de ferramentas de linha de comando JavaScript._

Guia de instalação do Volta: [docs-volta](https://docs.volta.sh/guide/getting-started)

Instale a versão fixada no arquivo package.json

```zsh
  volta install node@[version]
```

Verifique a instalação

```zsh
  volta list
```

_atenção: todos os comandos a seguir devem ser executados na raiz do projeto_

#

Instale as dependências

```zsh
  npm install
```

Crie o arquivo _.env_ conforme o arquivo _.env.sample_ e execute o comando abaixo para prover o container do banco de dados

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

Execute o comando a seguir para rodar os testes

```zsh
  $ npm run test
```

_A prioridade foi testar as funções puras, especificamente as que realizam operações sensíveis, como manipulação de datas._
