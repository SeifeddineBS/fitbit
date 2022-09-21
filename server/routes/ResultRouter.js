const router = require("express").Router();
const controller =require("../controller/ResultController");
const verify=require('../routes/verifyToken');



//Api
//router.post('/add',verify,controller.create);

router.post('/add',controller.create);
router.get('/find',controller.find);
router.put('/update',controller.update);
router.delete('/delete',controller.delete);



module.exports=router;