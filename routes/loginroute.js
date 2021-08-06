const router = require('express').Router();
const logincontroller = require('../controllers/logincontroller')
const bodyparser = require('body-parser')

router.get('/',logincontroller.getlogin)
router.post('/',bodyparser.urlencoded({extended:true}),logincontroller.postlogin)
router.post('/logout',logincontroller.postlogout)


module.exports = router;