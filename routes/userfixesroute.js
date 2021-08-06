const router = require('express').Router();
const userfixescontroller = require('../controllers/userfixescontroller')
const bodyparser = require('body-parser')

router.get('/',userfixescontroller.getinfo)

router.post('/',bodyparser.urlencoded({extended:true}),userfixescontroller.postuserfixes)

module.exports = router;