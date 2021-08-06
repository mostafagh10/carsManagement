const carsmodel = require('../models/carsmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult


exports.getcars = (req,res,next) => {
    carsmodel.getallcars().then(caritems => {
    res.render('cars',{
        caritems:caritems,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        carflash : req.flash('carerror')[0],
        carvalidation : req.flash('carvalidationerror')[0],
        pagetitle:"manage cars"
    })
})
}

exports.postcar = (req,res,next) => {
    if(validationres(req).array().length == 0){
    carsmodel.postinaddcars(req.body.branch,req.body.name,req.body.cartype,req.body.model,req.body.aircondition,req.body.aircondition_fix_date,req.body.car_license_date).then(()=> {
        res.redirect('/cars')
    }).catch(err => {
        console.log(err)
        req.flash('carerror',err)
        res.redirect('/cars')
    })
}
else{
    req.flash('carvalidationerror',validationres(req).array())
    res.redirect('/cars')
}
}

exports.deletecar = (req,res,next) => {
    carsmodel.deletethecar(req.body.carid).then(() => {
        res.redirect('/cars')
    }).catch(err => {
        console.log(err);
    })
}