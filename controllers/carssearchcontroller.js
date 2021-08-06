const carsmodel = require ('../models/carsmodel')
const session = require('express-session')

exports.getinfo = (req,res,next) => {
    let branch = req.query.branchname
    let carname = req.query.carname
    carsmodel.getcarsbyname(branch,carname).then(infoitems => {
    res.render('carssearch',{
        infoitems : infoitems,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        pagetitle:"search for cars"
    })
})
}