const router = require("express").Router();
const controller =require("../controller/loginController");


//Api
router.put('/login',controller.login);


module.exports=router;
