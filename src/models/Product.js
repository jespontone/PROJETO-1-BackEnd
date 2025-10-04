
const { mongoose } = require('../db');
const { logError } = require('../logger');
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const ProductModel = model('Product', productSchema);

class Product {
  constructor(doc) {
    Object.assign(this, doc);
  }

  static async insert({ title, description, price }) {
    try {
      if (!title || price === undefined) throw new Error('Campos obrigatórios ausentes: title e price');
      const doc = await ProductModel.create({ title, description, price });
      return new Product(doc.toObject());
    } catch (err) {
      logError(err);
      throw err;
    }
  }

  static async findById(id) {
    try {
      const doc = await ProductModel.findById(id).lean();
      return doc ? new Product(doc) : null;
    } catch (err) {
      logError(err);
      throw err;
    }
  }

  static async findAll() {
    try {
      const docs = await ProductModel.find().lean();
      return docs.map(d => new Product(d));
    } catch (err) {
      logError(err);
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      const res = await ProductModel.deleteOne({ _id: id });
      return res.deletedCount > 0;
    } catch (err) {
      logError(err);
      throw err;
    }
  }
}

module.exports = Product;
