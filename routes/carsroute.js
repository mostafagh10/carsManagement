const router = require('express').Router();
const carscontroller = require('../controllers/carscontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/',carscontroller.getcars)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('branch').not().isEmpty().withMessage('يجب ادخال الفرع'),
checkvalidator('name').not().isEmpty().withMessage('يجب ادخال رقم السيارة'),
checkvalidator('cartype').not().isEmpty().withMessage('يجب ادخال نوع السيارة'),
checkvalidator('model').not().isEmpty().withMessage('يجب ادخال الموديل'),
checkvalidator('aircondition_fix_date').not().isEmpty().withMessage('يجب ادخال تاريخ صيانةالمبرد'),
checkvalidator('car_license_date').not().isEmpty().withMessage('يجب ادخال تاريخ ترخيص السيارة')
,carscontroller.postcar)

router.post('/delete',bodyparser.urlencoded({extended:true}),carscontroller.deletecar)

module.exports = router;