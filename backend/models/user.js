const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isDelted:{type:Boolean,default:false},
    role: { type: String, enum: ['user', 'admin'], default: 'user' ,required:true}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema)
module.exports = User
