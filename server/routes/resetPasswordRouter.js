const router = require("express").Router();
const controller =require("../controller/resetPasswordController");


router.put('/resetPasswordRequest/:email',controller.resetPasswordRequest);
router.put('/resetPasswordCheckToken/:token',controller.resetPasswordCheckToken);

module.exports=router;