const express=require('express');
const router=express.Router();
const homeController=require('../controllers/doctorcontroller');
router.get('/reports/:status',homeController.allReports);

router.use('/doctor',require('./doctors'))
router.use('/patient',require('./patient'))
module.exports=router;