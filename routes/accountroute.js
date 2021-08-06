const router = require('express').Router();
const accountcontroller = require('../controllers/accountcontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/',accountcontroller.getaccount)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('changepassword').not().isEmpty().withMessage('يجب ادخال كلمة المرور ليتم تغييرها')
,accountcontroller.updatepassword)

module.exports = router;