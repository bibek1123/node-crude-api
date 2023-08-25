const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
require("../db/connection");
const validate = require("../middleware/validate");
const validation = require("../utils/validation/authValidation");
const UserController = require('../controllers/userController')
const checkRouter = require('../middleware/checkRouter')

router.use(cookieParser());

//user routes:

//create user: signup:
router.post("/signup", validate(validation.createKeys), UserController.userRegistration,);

//login:
router.post("/login", validate(validation.loginKeys), UserController.userLogin);

//all users list:
router.get("/list", authenticate, UserController.usersList);

// read user either username or email:
router.get("/get/:query", authenticate, UserController.singleUser);

//update user Data:
router.put("/update/:id", authenticate, checkRouter, UserController.updateUser);

//delete user:
router.put("/soft-delete/:query", authenticate, checkRouter, UserController.deleteUser);

module.exports = router;

