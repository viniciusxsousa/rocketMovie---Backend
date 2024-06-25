# Rocket Movies (Back-end)

Rocket Movies é um projeto backend desenvolvido em Node.js, focado no gerenciamento de filmes pelos usuários. Nesta aplicação, os usuários podem salvar informações sobre filmes, adicionar descrições detalhadas e atribuir notas de avaliação. O backend inclui toda a configuração do servidor, a API para operações CRUD (criação, leitura, atualização e exclusão) dos filmes e a integração com o banco de dados. Este sistema foi projetado para ser eficiente e escalável, proporcionando uma base robusta para o armazenamento e recuperação de informações de filmes.

### :arrow_forward: Rodando o projeto

1. Para rodar o projeto você precisa ter o node e o npm instalado.
2. Faça o clone desse repositório.
3. Rode o comando `npm install`, para instalar as dependências.
4. Rode o comando `npm run migrate`, para criar o banco de dados.
5. Copie o arquivo `.env.example` e cole na raíz do projeto.
6. No arquivo que foi copiado, renomeie deixando apenas com `.env`.
7. Entre no arquivo `.env`, defina o `AUTH_SECRET`, com a qualquer palavra. 
8. Difina uma porta para `SERVER_PORT`, pode ser 8080 como exemplo.
9. Rode o comando `npm run dev`, para rodar o projeto. 

Para rodar o front-end do projeto, acesse e siga o passo a passo do seguinte link: https://github.com/viniciusxsousa/rocketMovie-Frontend 



### :atom_symbol: Tecnologias 
* [Node](https://nodejs.org/en)
* [Express](https://expressjs.com/pt-br/)
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
* [Knex.js](https://knexjs.org/)
* [Multer](https://www.npmjs.com/package/multer)
* [bcrypt.js](bcrypt.js)
* [SQLite](https://www.sqlite.org/)


### :computer_mouse: Features
* API com cadastro de usuário.
* API com CRUD completo de um filme (criação, leitura, atualização e exclusão).
* Criptografia das senhas.
* Validação do usuário por token JWT.
* Variáveis de ambiente para configurar o seu ambiente.
