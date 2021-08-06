const forgetpasswordmodel = require('../models/forgetpasswordmodel')
const validationres = require('express-validator').validationResult
const usersmodel = require('../models/usersmodel')


exports.getforgetpassword = (req,res,next) => {
    usersmodel.getthelength().then((users) => {
    res.render('forgetpassword',{
        userslength:users,
        isuser:false,
        isadmin1:false,
        isadmin2:false,
        forgetvalidation : req.flash('forgetvalidationerror')[0],
        successvalidation : req.flash('successvalidationmessage')[0],
        pagetitle:"forget password"
    })
})
}

exports.posttheforgetpassword = (req,res,next) => {
    if(validationres(req).array().length == 0){
    forgetpasswordmodel.postinaddforgettenpassword(req.body.email).then(()=> {
        res.redirect('/forgetpassword')
        req.flash('successvalidationmessage','تم ارسال الطلب بنجاح')
    }).catch(err => {
        console.log(err)
        res.redirect('/forgetpassword')
    })
}
else{
    req.flash('forgetvalidationerror',validationres(req).array())
    res.redirect('/forgetpassword')
}
}