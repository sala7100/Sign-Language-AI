const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUserId,
  updateUserPatchMethod,
  deleteUserId,
} = require("../controllers/users");

const {
  createUserSchema,
  updateUserPutSchema,
  updateUserSchema,
} = require("../utilts/validarion/user");

const validate = require("../middlewares/vaidate");
const auth = require("../middlewares/auth");
const res = require("../middlewares/res");

router.post(
  "/",
  auth,
  res("admin"),         
  validate(createUserSchema),     
  createUser                      
);

router.get("/",auth,res("admin"), getUsers);
router.get("/:id",auth,res("admin"), getUserById);
router.put("/:id",auth,res("admin"), updateUserId);
router.patch("/:id",auth,res("admin"), updateUserPatchMethod);
router.delete("/:id",auth,res("admin"), deleteUserId);

module.exports = router;
