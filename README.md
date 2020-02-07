# typescript-mysql

Usando TypeScript com o banco de dados MySQL

## Configurando o ambiente

Faça Download e instale as seguintes aplicações:

* [Node.js](https://nodejs.org/)
* [Banco de Dados MySQL](https://www.mysql.com/downloads/)

Em seguida, precisamos instalar alguns módulos do Node.js (pacotes). Usaremos o pacote TypeORM. Este fornece mapeamento objeto-relacional para o TypeScript acessar a maioria dos bancos de dados relacionais incluindo o banco de dados MySQL.

Instale o pacote `typeorm`. 
```
npm install typeorm -g
```
O parâmetro `-g` indica que o pacote será instalado no sistema e disponível para outros projetos (no linux ou mac, pode ser necessário utilizar o sudo).


Instale a biblioteca `reflect-metadata`, necessária ao usar `decorators` (decoradores) de classe. A biblioteca reflect-metadata é experimental, assim como os decoradores. 
```
npm install reflect-metadata -g
```

Instale os tipos do node. O TypeScript definitons (tsd) possui informações dos nomes de métodos e funções, inclusive tipos que podem ser utilizados pelo TypeScript.
```
npm install @types/node -g
```

Instale o driver do banco de dados MySQL.
```
npm install mysql -g
```

## Criando o projeto

Crie um projeto TypeORM para o banco de dados MySQL. O nome do projeto é arbitrário.
Entre no diretório do projeto e digite:
```
typeorm init --database mysql
```
Serão criados os arquivos:

package.json
: Arquivo de configuração do node. Neste arquivo são especificados os módulos e versões utilizadas na aplicação além de outras informações do projeto.

tsconfig.json
: Neste aquivo são especificados o diretório onde serão gerados os aquivos js além de outras configurações do TypeScript

ormconfig.json
: Arquivo de configuração no TypeORM. Aqui são informados as configurações de banco entre outros.

.gitignore
: Arquivo de configuração que especifica quais diretórios/arquivos deverão ser ignorados em um repositórios git 

Além desses arquivos de configuração uma estrutura inicial do projeto também será criada 

```
- src
-- entity
-- migration
```

Uma entidade `User` será criada como modelo e o arquivo `index.ts` já estará configurado para incluir esta nova entidade.

Para testar, instale as dependências do projeto.
```
npm install
```

Crie um novo esquema no banco MySQL e altere o arquivo `ormconfig.json` com as configurações deste banco

Execute o comando:

```
npm run start
```

Além de criar a tebela `user` no banco será inserio um novo registro na mesma.