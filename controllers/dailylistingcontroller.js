const dailylistingmodel = require ('../models/dailylistingmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult


exports.getinfo = (req,res,next) => {
    let branch = req.query.branchname
    let carname = req.query.carname
    dailylistingmodel.getcarsbyname(branch,carname).then(infoitems => {
    res.render('dailylisting',{
        infoitems : infoitems,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        listingvalidation : req.flash('listingvalidationerror')[0],
        successlistingvalidation : req.flash('successlistingvalidationmessage')[0],
        pagetitle:"daily counter listing"
    })
})
}

exports.postdailycounter = (req,res,next) => {
    if(validationres(req).array().length == 0){
    dailylistingmodel.postindailylisting(req.body.carname,req.body.lastcounter,req.body.presentcounter,req.body.numofliters,req.body.rate,req.body.dateoflisting).then(()=> {
        res.redirect('/dailylisting')
        req.flash('successlistingvalidationmessage','تم تسجيل العداد اليومي بنجاح')
    }).catch(err => {
        console.log(err)
        res.redirect('/dailylisting')
    })
}
else{
    req.flash('listingvalidationerror',validationres(req).array())
    res.redirect(req.body.path)
}
}