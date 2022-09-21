const router = require("express").Router();
const controller =require("../controller/Vo2maxController");
const verify=require('./verifyToken');



//Api
//router.post('/add',verify,controller.create);

router.post('/add',controller.create);
router.get('/find',controller.find);
router.put('/update',controller.update);
router.delete('/delete',controller.delete);



module.exports=router;