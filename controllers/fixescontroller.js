const fixesmodel = require('../models/fixesmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult


exports.getfixes = (req,res,next) => {
    fixesmodel.getallfixes().then(fixitems => {
    res.render('fixes',{
        fixitems:fixitems,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        fixvalidation : req.flash('fixvalidationerror')[0],
        pagetitle:"manage fixes"
    })
})
}

exports.postfix = (req,res,next) => {
    if(validationres(req).array().length == 0){
    fixesmodel.postinaddfixes(req.body.fixtype,req.body.name).then(()=> {
        res.redirect('/fixes')
    }).catch(err => {
        console.log(err)
        res.redirect('/fixes')
    })
}
else{
    req.flash('fixvalidationerror',validationres(req).array())
    res.redirect('/fixes')
}
}

exports.deletefix = (req,res,next) => {
    fixesmodel.deletethefix(req.body.fixid).then(() => {
        res.redirect('/fixes')
    }).catch(err => {
        console.log(err);
    })
}