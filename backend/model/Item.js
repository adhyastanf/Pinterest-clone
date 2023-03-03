const mongoose = require('mongoose');
// const User = require('./User');

const ItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  desc: String,
  img: String,
});

module.exports = mongoose.model('Item', ItemSchema);
