const router = require('express').Router();
const forgettenlistcontroller = require('../controllers/forgettenlistcontroller')
const bodyparser = require('body-parser')

router.get('/',forgettenlistcontroller.getforgettenlist)

router.post('/',bodyparser.urlencoded({extended:true}),forgettenlistcontroller.returnthepassword)

module.exports = router;