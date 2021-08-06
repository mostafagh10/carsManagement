const router = require('express').Router();
const userscontroller = require('../controllers/userscontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;

router.get('/',userscontroller.getusers)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('email').not().isEmpty().withMessage('يجب ادخال البريد الالكتروني للمستخدم')
,userscontroller.postuser)

router.post('/delete',bodyparser.urlencoded({extended:true}),userscontroller.deleteuser)

module.exports = router;