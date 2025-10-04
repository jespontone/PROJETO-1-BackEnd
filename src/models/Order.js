
const { mongoose } = require('../db');
const { logError } = require('../logger');
const { Schema, model, Types } = require('mongoose');

const orderSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const OrderModel = model('Order', orderSchema);

class Order {
  constructor(doc) {
    Object.assign(this, doc);
  }

  static async insert({ user_id, total, status }) {
    try {
      if (!user_id || total === undefined) throw new Error('Campos obrigatórios ausentes: user_id e total');
      const doc = await OrderModel.create({ user_id, total, status: status || 'pending' });
      return new Order(doc.toObject());
    } catch (err) {
      logError(err);
      throw err;
    }
  }

  static async findById(id) {
    try {
      const doc = await OrderModel.findById(id).lean();
      return doc ? new Order(doc) : null;
    } catch (err) {
      logError(err);
      throw err;
    }
  }

  static async findAll() {
    try {
      const docs = await OrderModel.find().lean();
      return docs.map(d => new Order(d));
    } catch (err) {
      logError(err);
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      const res = await OrderModel.deleteOne({ _id: id });
      return res.deletedCount > 0;
    } catch (err) {
      logError(err);
      throw err;
    }
  }
}

module.exports = Order;
