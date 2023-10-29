const express=require('express');
const router=express.Router();
const passport=require('passport')
const doctorController=require('../controllers/doctorcontroller')

router.post('/register',passport.authenticate('jwt', { session: false }),doctorController.registerPatient);
router.post('/:id/create-report',passport.authenticate('jwt', { session: false }),doctorController.createReport);
router.get('/:id/all-report',doctorController.all_reports);
router.get('/:status',doctorController.allReports)

module.exports=router;