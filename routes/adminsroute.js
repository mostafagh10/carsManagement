const router = require('express').Router();
const adminscontroller = require('../controllers/adminscontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/',adminscontroller.getadmins)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('email').not().isEmpty().withMessage('يجب ادخال البريد الالكتروني للادمن')
,adminscontroller.postadmin)

router.post('/delete',bodyparser.urlencoded({extended:true}),adminscontroller.deleteadmin)

module.exports = router;