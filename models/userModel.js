const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: { // added cart in user
    type: Array,
  }
});
//to fetch cart from user
const User = mongoose.model('User', UserSchema);

module.exports = User;
