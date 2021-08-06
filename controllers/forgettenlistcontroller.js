const forgetpasswordmodel = require('../models/forgetpasswordmodel')
const session = require('express-session')
const bcrypt = require('bcrypt')

exports.getforgettenlist = (req,res,next) => {
    forgetpasswordmodel.getallforgetpasswords().then((forgettenlist) => {
    res.render('forgettenlist',{
        forgettenlist:forgettenlist,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        pagetitle:"manage forget password"
    })
})
}

exports.returnthepassword = (req,res,next) => {
    forgetpasswordmodel.returnpassword(req.body.forgettenuserid,req.body.email).then(() => {
        res.redirect('/forgettenlist')
    }).catch(err => {
        console.log(err)
        res.redirect('/forgettenlist')
    })
}