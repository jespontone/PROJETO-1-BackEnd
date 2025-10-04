
const { mongoose } = require('../db');
const { logError } = require('../logger');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const UserModel = model('User', userSchema);

class User {
  constructor(doc) {
    Object.assign(this, doc);
  }

  static async insert({ name, email }) {
    try {
      if (!name || !email) throw new Error('Campos obrigatórios ausentes: name e email');
      const doc = await UserModel.create({ name, email });
      return new User(doc.toObject());
    } catch (err) {
      logError(err);
      throw err;
    }
  }

  static async findById(id) {
    try {
      const doc = await UserModel.findById(id).lean();
      return doc ? new User(doc) : null;
    } catch (err) {
      logError(err);
      throw err;
    }
  }

  static async findAll() {
    try {
      const docs = await UserModel.find().lean();
      return docs.map(d => new User(d));
    } catch (err) {
      logError(err);
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      const res = await UserModel.deleteOne({ _id: id });
      return res.deletedCount > 0;
    } catch (err) {
      logError(err);
      throw err;
    }
  }
}

module.exports = User;
