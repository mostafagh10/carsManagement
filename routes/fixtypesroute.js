const router = require('express').Router();
const fixtypescontroller = require('../controllers/fixtypescontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/',fixtypescontroller.getfixtypes)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('name').not().isEmpty().withMessage('يجب كتابة نوع الاصلاح ليتم اضافته')
,fixtypescontroller.postfixtype)

router.post('/delete',bodyparser.urlencoded({extended:true}),fixtypescontroller.deletefixtype)

module.exports = router;