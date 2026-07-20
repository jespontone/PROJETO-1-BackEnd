
# Projeto 1 - Biblioteca de Acesso a SGDB (Node.js + MongoDB)

Esta versão usa **MongoDB** (via Mongoose) em vez de SQLite.

Estrutura:
- package.json
- src/
  - db.js          -> conexão com MongoDB usando MONGO_URI
  - logger.js      -> logger simples que grava erros em logs/error.log
  - models/
    - User.js      -> Mongoose model
    - Product.js   -> Mongoose model
    - Order.js     -> Mongoose model (referencia user)
  - index.js       -> exemplo de uso das models (script de demonstração)
- logs/
  - error.log

Como usar
1. Assegure que você tem o MongoDB rodando localmente ou em um serviço (Atlas).
2. Defina a variável de ambiente MONGO_URI, por exemplo:
   export MONGO_URI="mongodb://localhost:27017/projeto1"  (Linux/macOS)
   set MONGO_URI="mongodb://localhost:27017/projeto1"     (Windows PowerShell)
3. No diretório do projeto, rode `npm install`.
4. Execute `npm start` para rodar o script de demonstração (`src/index.js`). Isso irá:
   - conectar ao MongoDB,
   - criar um usuário, um produto e um pedido de demonstração,
   - listar os registros no console.

