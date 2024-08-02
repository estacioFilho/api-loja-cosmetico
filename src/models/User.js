const mongoose = require('mongoose');
const crypto = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name:{ type: mongoose.Schema.Types.String, required:true },
  email: {
    type: String, required: true, unique: true, match: /.+\@.+\..+/,
  },
  password: { type: String, required: true },
  birthDate: { type: Date, default: Date.now },

}, { versionKey: false });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
  this.password = await crypto.hash(this.password, salt);
  return next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return crypto.compare(candidatePassword, this.password);
};

const user = mongoose.model('user', UserSchema);
module.exports = user;
