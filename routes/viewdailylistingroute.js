const router = require('express').Router();
const viewdailylistingcontroller = require('../controllers/viewdailylistingcontroller')
const bodyparser = require('body-parser')

router.get('/',viewdailylistingcontroller.getinfo)
router.post('/delete',bodyparser.urlencoded({extended:true}),viewdailylistingcontroller.deletelisting)


module.exports = router;