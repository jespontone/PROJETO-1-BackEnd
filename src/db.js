
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/projeto1';

async function connect() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado em', mongoUri);
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err);
    throw err;
  }
}

module.exports = { connect, mongoose };
