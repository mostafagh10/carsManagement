const router = require('express').Router();
const branchescontroller = require('../controllers/branchescontroller')
const bodyparser = require('body-parser')
const checkvalidator = require('express-validator').check;

router.get('/',branchescontroller.getbranches)

router.post('/',bodyparser.urlencoded({extended:true}),
checkvalidator('name').not().isEmpty().withMessage('يجب كتابة اسم الفرع ليتم اضافتها')
,branchescontroller.postbranch)

router.post('/delete',bodyparser.urlencoded({extended:true}),branchescontroller.deletebranch)

module.exports = router;