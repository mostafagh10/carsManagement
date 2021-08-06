const router = require('express').Router();
const forgetpasswordcontroller = require('../controllers/forgetpasswordcontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/',forgetpasswordcontroller.getforgetpassword)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('email').not().isEmpty().withMessage('يجب ادخال البريد الالكتروني')
,forgetpasswordcontroller.posttheforgetpassword)

module.exports = router;