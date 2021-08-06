const router = require('express').Router();
const carssearchcontroller = require('../controllers/carssearchcontroller')
const bodyparser = require('body-parser')

router.get('/',carssearchcontroller.getinfo)

module.exports = router;