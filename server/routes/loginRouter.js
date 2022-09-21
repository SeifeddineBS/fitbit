const router = require("express").Router();
const controller =require("../controller/loginController");


//Api
router.put('',controller.login);


module.exports=router;
