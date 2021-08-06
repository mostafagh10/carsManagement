const router = require('express').Router();
const carstypescontroller = require('../controllers/carstypescontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/',carstypescontroller.getcarstypes)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('name').not().isEmpty().withMessage('يجب كتابة نوع السيارة ليتم اضافتها')
,carstypescontroller.postcarstype)

router.post('/delete',bodyparser.urlencoded({extended:true}),carstypescontroller.deletecarstype)

module.exports = router;