const carstypesmodel = require('../models/carstypesmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult


exports.getcarstypes = (req,res,next) => {
    carstypesmodel.getallcarstypes().then(carstypes => {
    res.render('carstypes',{
        carstypes:carstypes,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        carstypesflash : req.flash('carstypeserror')[0],
        carstypesvalidation : req.flash('carstypesvalidationerror')[0],
        pagetitle:"manage cars types"
        
    })
})
}

exports.postcarstype = (req,res,next) => {
    if(validationres(req).array().length == 0){
    carstypesmodel.postinaddcarstype(req.body.name).then(()=> {
        res.redirect('/carstypes')
    }).catch(err => {
        console.log(err)
        req.flash('carstypeserror',err)
        res.redirect('/carstypes')
    })
}
else{
    req.flash('carstypesvalidationerror',validationres(req).array())
    res.redirect('/carstypes')
}
}

exports.deletecarstype = (req,res,next) => {
    carstypesmodel.deletethecarstype(req.body.carstypeid).then(() => {
        res.redirect('/carstypes')
    }).catch(err => {
        console.log(err);
    })
}