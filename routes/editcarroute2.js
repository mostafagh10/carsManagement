const router = require('express').Router();
const editcarcontroller2 = require('../controllers/editcarcontroller2')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;


router.get('/:id',editcarcontroller2.getcar)

router.post('/:id',bodyparser.urlencoded({extended:true}),
checkvalidator('carlicense_date').not().isEmpty().withMessage('يجب ادخال التاريخ ليتم التعديل')
,editcarcontroller2.updatecarlicensedate)

module.exports = router;