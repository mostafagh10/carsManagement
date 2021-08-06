const router = require('express').Router();
const dailylistingcontroller = require('../controllers/dailylistingcontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/',dailylistingcontroller.getinfo)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('presentcounter').not().isEmpty().withMessage('يجب كتابة رقم العداد الحالي'),
checkvalidator('numofliters').not().isEmpty().withMessage('يجب كتابة عدد لترات الوقود'),
checkvalidator('dateoflisting').not().isEmpty().withMessage('يجب كتابة التاريخ')
,dailylistingcontroller.postdailycounter)

module.exports = router;