const dailylistingmodel = require ('../models/dailylistingmodel')
const session = require('express-session')

exports.getinfo = (req,res,next) => {
    let branch = req.query.branchname
    let carname = req.query.carname
    dailylistingmodel.getcarsbyname(branch,carname).then(infoitems => {
    res.render('viewdailylisting',{
        infoitems : infoitems,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        pagetitle:"manage daily counter listings"
    })
})
}

exports.deletelisting = (req,res,next) => {
    dailylistingmodel.deletethelisting(req.body.dailylistingid).then(() => {
        res.redirect(req.body.path)
    }).catch(err => {
        console.log(err);
    })
}