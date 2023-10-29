const express=require('express');
const router=express.Router();
const doctorController=require('../controllers/doctorcontroller')

router.post('/register',doctorController.registerPatient);
router.post('/:id/create-report',doctorController.createReport);
router.get('/:id/all-report',doctorController.all_reports);
router.get('/:status',doctorController.allReports)

module.exports=router;