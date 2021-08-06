const usersmodel = require('../models/usersmodel')
const session = require('express-session')
const router = require('../routes/loginroute')
const validationres = require('express-validator').validationResult
const bcrypt = require('bcrypt')


exports.getaccount = (req,res,next) => {
    usersmodel.getaccountbyid(req.session.userID).then(account => {
    res.render('account',{
        account:account.user,
        userslength : account.users,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        changepasswordvalidation : req.flash('changepasswordvalidationerror')[0],
        successupdatepasswordvalidation : req.flash('successupdatepasswordvalidationmessage')[0],
        pagetitle:"my account"
    })
})
}

exports.updatepassword = (req,res,next) => {
    if(validationres(req).array().length == 0){
    usersmodel.editpassword(req.body.accountid,req.body.changepassword).then(() => {
        res.redirect('/account')
        req.flash('successupdatepasswordvalidationmessage','تم تغيير كلمة المرور بنجاح')
    }).catch(err => {
        console.log(err)
        res.redirect('/account');
    })
}
else{
    req.flash('changepasswordvalidationerror',validationres(req).array())
    res.redirect('/account')
}
}