const router = require('express').Router();
const fixescontroller = require('../controllers/fixescontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/',fixescontroller.getfixes)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('fixtype').not().isEmpty().withMessage('يجب ادخال نوع الاصلاح'),
checkvalidator('name').not().isEmpty().withMessage('يجب كتابة اسم الاصلاح ليتم اضافته')
,fixescontroller.postfix)

router.post('/delete',bodyparser.urlencoded({extended:true}),fixescontroller.deletefix)

module.exports = router;