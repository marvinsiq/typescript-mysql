# typescript-mysql

Usando TypeScript com o banco de dados MySQL

- [Configurando o ambiente](#configurando-o-ambiente)
- [Criando o projeto](#criando-o-projeto)
- [Criando uma entidade](#criando-uma-entidade)
- [Criando uma conexão para gerar tabelas](criando-uma-conexao-para-gerar-tabelas)
----------------------------------

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

## Criando uma entidade

Nesta seção, desenvolveremos uma entidade para modelar um catálogo de periódicos. Uma entidade é uma classe que mapeia uma tabela de banco de dados. O que faz de uma classe uma entidade é o decorador `@Entity()` da biblioteca typeorm. 

Adicione um arquivo `Catalog.ts` no diretório `entity` para definir uma entidade. 
Adicione um import para importar as funções `Entity`, `Column` e `PrimaryGeneratedColumn` da biblioteca `typeorm`.

```typescript
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
```

Exporte uma classe chamada `Catalog` e anote ou decore a classe com `@Entity()`.

```typescript
@Entity()
export class Catalog {
…
}
```

Uma entidade básica consiste em colunas e toda entidade deve declarar pelo menos uma coluna principal. 

O TypeORM fornece vários tipos de colunas principais, conforme visto na Tabela abaixo:

| Tipo de coluna principal         | Descrição                                                                                                                                                                                                        |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| @PrimaryColumn ()                | Cria uma coluna principal. O tipo de coluna pode ser opcionalmente especificado e, se não definido, é inferido a partir do tipo de propriedade. O valor para a coluna principal deve ser fornecido pelo usuário. |
| @PrimaryGeneratedColumn ()       | Cria uma coluna principal do tipo int que é gerada automaticamente com um valor de incremento automático.                                                                                                        |
| @PrimaryGeneratedColumn ("uuid") | Cria uma coluna principal que também é gerada automaticamente com um valor de uuid; uuid sendo um valor de string exclusivo.                                                                                     |

Adicione uma coluna principal chamada `id` à entidade `Catalog`. O banco de dados MySQL suporta o incremento automático de uma coluna primária com a qual um valor exclusivo de chave primária é atribuído automaticamente pelo banco de dados para cada nova linha de dados. Para aproveitar o recurso de incremento automático, use a coluna gerada automaticamente com `@PrimaryGeneratedColumn`.

```typescript
@PrimaryGeneratedColumn()
id: number;
```

Estamos modelando um catálogo de periódicos na aplicação de exemplo. Adicione outras colunas; `journal`, `publisher`, `edition`, `title` e `author` todos com o tipo `string`. 
Adicione uma coluna chamada `isPublished` do tipo `Boolean` para indicar se a entrada do catálogo está publicada. Os tipos de propriedade da entidade são mapeados para os tipos de coluna de banco de dados apropriados, que podem variar com o banco de dados usado. O tipo `string` é mapeado para um `varchar(255)` ou tipo similar de banco. O tipo `number` é mapeado para um `integer`. O mapeamento do tipo também pode ser fornecido pelo usuário. Como exemplo, mapeie a coluna `title` com o tipo `text` do banco de dados MySQL.

```typescript
@Column("text")
title: string;
```

O comprimento padrão para o tipo string é 255, mas isso pode ser personalizado como exemplo:

```typescript
@Column({length: 25})
edition: string;
```

Copie e cole o código da entidade Catalog

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Catalog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    journal: string;

    @Column()
    publisher: string;

    @Column({ length: 25 })
    edition: string;

    @Column("text")
    title: string;

    @Column()
    author: string;

    @Column()
    isPublished: boolean;
}
```

## Criando uma conexão para gerar tabelas

Estamos desenvolvendo um aplicativo CRUD (Create, Read, Update and Delete) e para para isso precisamos nos conectar com o banco de dados MySQL.

Ao iniciar o projeto com o comando `typeorm init --database mysql` foi criado automaticamente o arquivo `src/index.ts` que possui um exemplo de conexão e inserção no banco. Vamos utiliza-lo como base para exemplificar e criar nossa aplicação. Utilizaremos apenas a entidade do arquivo `entity/Catalog.ts` então exclua o arquivo `entity/User.ts`e remova o import da mesma no arquivo `src/index.ts`. 

O arquivo `src/index.ts` importa a biblioteca `reflect-metadat` pois ela é necessária para poder usar decoradores. 
Ele também importa `createConnection` da biblioteca `typeorm`.
A função `createConnection()` é a responsável por fazer a conexão de fato com o nosso banco. Como não estamos passando nenhum parâmetro as configurações de conexão são recuperadas do arquivo `ormconfig.json`. No entanto é possível fazer a conexão passando os parâmetros como no modelo abaixo:

```typescript
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "mysql",
  database: "mysql",
  entities: [
     __dirname + "/entity/*.ts"
  ],
  synchronize: true,
  logging: false
}).then(async connection => {
…
…
}).catch(error => console.log(error));
```

A função createConnection() retorna uma `Promisse` que disponibiliza uma `connection` em caso de sucesso.

Para executarmos os métodos da connection utilizamos a sintaxe `async/await` que foi adicionada no ES2017. Com a `async/await` funções assíncronas são prefixadas com a palavra chave `async`. A palavra chave `await` suspende a execução do script até que uma promessa de retorno de função assíncrona seja cumprida. 

Vamos alterar nosso script `index.ts`:

Primeiro importe a classe `Catalog` do diretório `entity`. 
```typescript
import { Catalog } from "./entity/Catalog";
```

Remova todo o conteúdo da Arrow Function utilizada no método then da Promisse (iremos reimplementar).

Crie um objeto do tipo Catalog
```typescript
let catalog = new Catalog();
```

Defina os valores das propriedades da entidade para criar uma entrada de catálogo.

```typescript
catalog.journal = "Oracle Magazine";
catalog.publisher = "Oracle Publishing";
catalog.edition = "March-April 2005";
catalog.title = "Starting with Oracle ADF";
catalog.author = "Steve Muench";
catalog.isPublished = true;
```

Obtenha uma instância do EntityManagere e salve a entidade usando o método `save`.

```typescript
await connection.manager.save(catalog);
```

O método `save` salva a entidade no banco de dados e todos os seus relacionamentos. O método verifica primeiro se a entidade já existe no banco. Se isso acontecer, a entidade é atualizada, caso contrário é adicionada uma nova. 

O src/index.ts ficará assim:

```typescript
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Catalog } from "./entity/Catalog";

createConnection().then(async connection => {

    let catalog = new Catalog();

    catalog.journal = "Oracle Magazine";
    catalog.publisher = "Oracle Publishing";
    catalog.edition = "March-April 2005";
    catalog.title = "Starting with Oracle ADF";
    catalog.author = "Steve Muench";
    catalog.isPublished = true;   
    
    await connection.manager.save(catalog);

    console.log(`Catalog has been saved \n`);

}).catch(error => console.log(error));
```


*Artigo baseado no original [Using TypeScript with the MySQL Database](https://www.infoq.com/articles/typescript-mysql/)* :link: