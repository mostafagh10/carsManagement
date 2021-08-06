const router = require('express').Router();
const fixesofuserscontroller = require('../controllers/fixesofuserscontroller')
const bodyparser = require('body-parser')

router.get('/',fixesofuserscontroller.getusersfixes)

router.post('/download',bodyparser.urlencoded({extended:true}),fixesofuserscontroller.postdownload)

router.post('/delete',bodyparser.urlencoded({extended:true}),fixesofuserscontroller.deleteuserfixes)


module.exports = router;