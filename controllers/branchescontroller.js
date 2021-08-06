const branchmodel = require('../models/branchesmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult

exports.getbranches = (req,res,next) => {
    branchmodel.getallbranches().then(branches => {
    res.render('branches',{
        branches : branches,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        branchflash : req.flash('brancherror')[0],
        branchvalidation : req.flash('branchvalidationerror')[0],
        pagetitle:"manage branches"
    })
})
}

exports.postbranch = (req,res,next) => {
    if(validationres(req).array().length == 0){
    branchmodel.postinaddbranch(req.body.name).then(()=> {
        res.redirect('/branch')
    }).catch(err => {
        console.log(err)
        req.flash('brancherror',err)
        res.redirect('/branch')
    })
}
else{
    req.flash('branchvalidationerror',validationres(req).array())
    res.redirect('/branch')
}
}

exports.deletebranch = (req,res,next) => {
    branchmodel.deletethebranch(req.body.branchid).then(() => {
        res.redirect('/branch')
    }).catch(err => {
        console.log(err);
    })
}