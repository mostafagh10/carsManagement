const fixtypesmodel = require('../models/fixtypesmodel')
const validationres = require('express-validator').validationResult


exports.getfixtypes = (req,res,next) => {
    fixtypesmodel.getallfixtypes().then(fixtypes => {
    res.render('fixtypes',{
        fixtypes:fixtypes,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        fixtypesflash : req.flash("fixtypeserror")[0],
        fixtypesvalidation : req.flash('fixtypesvalidationerror')[0],
        pagetitle:"manage fixes types"

    })
})
}

exports.postfixtype = (req,res,next) => {
    if(validationres(req).array().length == 0){
    fixtypesmodel.postinaddfixtype(req.body.name).then(()=> {
        res.redirect('/fixestypes')
    }).catch(err => {
        console.log(err)
        req.flash('fixtypeserror',err)
        res.redirect('/fixestypes')
    })
}
else{
    req.flash('fixtypesvalidationerror',validationres(req).array())
    res.redirect('/fixestypes')
}
}

exports.deletefixtype = (req,res,next) => {
    fixtypesmodel.deletethefixtype(req.body.fixtypeid).then(() => {
        res.redirect('/fixestypes')
    }).catch(err => {
        console.log(err);
    })
}