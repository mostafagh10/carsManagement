const userfixesmodel = require ('../models/userfixesmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult



exports.getinfo = (req,res,next) => {
    let branchname = req.query.branchname;
    let fixtype = req.query.fixtype;
    userfixesmodel.getallinfo(branchname,fixtype).then(infoitems => {
    res.render('userfixes1',{
        infoitems : infoitems,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        successuserfixesvalidation : req.flash('successuserfixesvalidationmessage')[0],
        pagetitle:"user fixes"
    })
})
}

exports.postuserfixes = (req,res,next) => {
    userfixesmodel.postinadduserfixes(req.body.branch,req.body.carname,req.body.carinfo,req.body.modifiedcarlicensedate,req.body.workshop,req.body.counternumber,req.body.startdate,req.body.enddate,req.body.fixtype,req.body.fixes,req.body.notes).then(()=> {
        res.redirect('/userfixes')
        req.flash('successuserfixesvalidationmessage','تم تسجيل الاصلاحات بنجاح')
    }).catch(err => {
        console.log(err)
        res.redirect('/userfixes')
    })
}