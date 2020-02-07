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

## Criando uma entidade

Nesta seção, desenvolveremos uma entidade para modelar um catálogo de periódicos. Uma entidade é uma classe que mapeia uma tabela de banco de dados. O que faz de uma classe uma entidade é o decorador `@Entity()` da biblioteca typeorm. 

Adicione um arquivo `Catalog.ts` no diretório `entity` para definir uma entidade. 
Adicione um import para importar as funções `Entity`, `Column` e `PrimaryGeneratedColumn` da biblioteca `typeorm`.

```
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
```

Exporte uma classe chamada `Catalog` e anote ou decore a classe com `@Entity()`.

```
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

```
@PrimaryGeneratedColumn()
id: number;
```

Estamos modelando um catálogo de periódicos na aplicação de exemplo. Adicione outras colunas; `journal`, `publisher`, `edition`, `title` e `author` todos com o tipo `string`. 
Adicione uma coluna chamada `isPublished` do tipo `Boolean` para indicar se a entrada do catálogo está publicada. Os tipos de propriedade da entidade são mapeados para os tipos de coluna de banco de dados apropriados, que podem variar com o banco de dados usado. O tipo `string` é mapeado para um `varchar(255)` ou tipo similar de banco. O tipo `number` é mapeado para um `integer`. O mapeamento do tipo também pode ser fornecido pelo usuário. Como exemplo, mapeie a coluna `title` com o tipo `text` do banco de dados MySQL.

```
@Column("text")
title: string;
```

O comprimento padrão para o tipo string é 255, mas isso pode ser personalizado como exemplo:

```
@Column({length: 25})
edition: string;
```

Copie e cole o código da entidade Catalog

```
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

Artigo original: [Using TypeScript with the MySQL Database](https://www.infoq.com/articles/typescript-mysql/)