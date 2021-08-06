const usersmodel = require('../models/usersmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult


exports.getadmins = (req,res,next) => {
    usersmodel.getalladmins().then(admins => {
    res.render('admins',{
        admins:admins,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        adminflash : req.flash('adminerror')[0],
        adminsvalidation : req.flash('adminsvalidationerror')[0],
        pagetitle:"manage admins"
    })
})
}

exports.postadmin = (req,res,next) => {
    if(validationres(req).array().length == 0){
    usersmodel.postinaddadmin(req.body.email).then(()=> {
        res.redirect('/admins')
    }).catch(err => {
        console.log(err)
        req.flash('adminerror',err)
        res.redirect('/admins')
    })
}
else{
    req.flash('adminsvalidationerror',validationres(req).array())
    res.redirect('/admins')
}
}

exports.deleteadmin = (req,res,next) => {
    usersmodel.deletetheuser(req.body.adminid).then(() => {
        res.redirect('/admins')
    }).catch(err => {
        console.log(err);
    })
}