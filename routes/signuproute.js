const router = require('express').Router();
const signupcontroller = require('../controllers/signupcontroller')
const bodyparser = require('body-parser')

router.get('/',signupcontroller.getsignup)

router.post('/',bodyparser.urlencoded({extended:true}),signupcontroller.postsignup)

module.exports = router;