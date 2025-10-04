
// Script de demonstração/uso das models com MongoDB
const db = require('./db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

async function demo() {
  try {
    await db.connect();

    console.log('Criando usuário...');
    const u = await User.insert({ name: 'Maria Silva', email: 'maria@example.com' });
    console.log('Usuário criado:', u);

    console.log('Criando produto...');
    const p = await Product.insert({ title: 'Caneca estampada', description: 'Caneca de cerâmica 300ml', price: 39.9 });
    console.log('Produto criado:', p);

    console.log('Criando pedido...');
    const o = await Order.insert({ user_id: u._id || u.id, total: p.price, status: 'confirmed' });
    console.log('Pedido criado:', o);

    console.log('\nListando usuários:');
    console.log(await User.findAll());

    console.log('\nListando produtos:');
    console.log(await Product.findAll());

    console.log('\nListando pedidos:');
    console.log(await Order.findAll());

  } catch (err) {
    console.error('Erro no demo:', err);
  } finally {
    // fecha conexão mongoose
    setTimeout(() => db.mongoose.disconnect(), 1000);
  }
}

demo();
