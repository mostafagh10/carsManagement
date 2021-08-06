const usersmodel = require('../models/usersmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult


exports.getusers = (req,res,next) => {
    usersmodel.getallusers().then(users => {
    res.render('users',{
        users:users,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        userflash : req.flash('usererror')[0],
        usersvalidation : req.flash('usersvalidationerror')[0],
        pagetitle:"manage users"
    })
})
}

exports.postuser = (req,res,next) => {
    if(validationres(req).array().length == 0){
    usersmodel.postinadduser(req.body.email).then(()=> {
        res.redirect('/users')
    }).catch(err => {
        console.log(err)
        req.flash('usererror',err)
        res.redirect('/users')
    })
}
else{
    req.flash('usersvalidationerror',validationres(req).array())
    res.redirect('/users')
}
}

exports.deleteuser = (req,res,next) => {
    usersmodel.deletetheuser(req.body.userid).then(() => {
        res.redirect('/users')
    }).catch(err => {
        console.log(err);
    })
}