const router = require('express').Router();
const editcarcontroller = require('../controllers/editcarcontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/:id',editcarcontroller.getcar)

router.post('/:id',bodyparser.urlencoded({extended:true}),
checkvalidator('aircondition_fix_date').not().isEmpty().withMessage('يجب ادخال التاريخ ليتم التعديل')
,editcarcontroller.updateaircondate)

module.exports = router;