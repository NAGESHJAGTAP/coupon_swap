const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    emailPhone: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;