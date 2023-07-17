const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require('bcrypt')

// ce schema sert a definir la structure de nos document
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Veuillez entrer votre nom"],
      trim: true,
      validate: {
        validator: function(v) {
          return /^.{6,}$/.test(v);
        },
        message: "Le nom doit contenir au moins 6 caractères"
      }
    },
    email: {
      type: String,
      required: [true, 'veuillez entrer votre Email'],
      unique: true,
      validate: [validator.isEmail, 'Email invalide'],
      lowercase: true,
  },
  
    password: {
      type: String,
      require: [true, "Veuillez entrer votre mot de passe"],
      trim: true,
      validate: {
        validator: function(v) {
          return /^(?=.*\d).{6,}$/.test(v);
        },
        message: "Le mot de passe doit contenir au moins 6 caractères dont au moins 1 chiffre"
      }
    }
  }, { timestamps: true });

// timestamps est une fonction qui va permettre de horodoter nos document (c'est a dire à jouter a un mecanisme une valeur horaire)
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});
const User = mongoose.model('User', userSchema, 'users');
module.exports = User;





