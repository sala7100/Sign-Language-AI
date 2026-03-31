const AppError = require('../utilts/AppError');
const User = require("../models/user");


const createUser = async (req, res) => {
  
  const body = req.body;

  const newUser =await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  
  res.status(200).json({ message: "user created", user: newUser });
};


const getUsers = async (req, res) => {
  const {limit,page,name}=req.query
  let query={}
  if(name){
    query.name=name
  }
  const skip = (page-1)*limit
  const users = await User.find(query).limit(limit).skip(skip);
  const total = await User.countDocuments(query)
  const pag={
    total,
    page,
    pages: Math.ceil(total/limit)
  }
  res.status(200).json({users ,pag});
};


const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.status(200).json(user);
};


const updateUserId = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, body, { new: true });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({ message: "user updated", user });
};

const updateUserPatchMethod = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, body, { new: true });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({ message: "user updated", user });
};

const deleteUserId = async (req, res) => {
 const id = req.params.id

 const user= await User.findByIdAndDelete(id);
 
 if (!user) {
   throw new AppError("User not found", 404);
  }
  
  
  res.status(200).json({ message: "user deleted" });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserId,
  updateUserPatchMethod,
  deleteUserId,
};
