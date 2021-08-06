const carsmodel = require('../models/carsmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult


exports.getcar = (req,res,next) => {
    console.log(req.params.id);
    let id = req.params.id;
    carsmodel.getcarsbyid(id).then(car => {
    res.render('cars_edit',{
        car : car,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        aircondfixdatevalidation : req.flash('aircondfixdatevalidationerror')[0],
        successeditvalidation : req.flash('successeditvalidationmessage')[0],
        pagetitle:"change air_condition fix_date"
    })
})
}

exports.updateaircondate = (req,res,next) => {
    if(validationres(req).array().length == 0){
    carsmodel.editcar(req.body.carid,{aircondition_fixdate:req.body.aircondition_fix_date}).then(() => {
        res.redirect(req.body.path)
        req.flash('successeditvalidationmessage','تم تعديل تاريخ صيانة المبرد بنجاح')
    }).catch(err => {
        console.log(err)
        res.redirect(req.body.path);
    })
}
else{
    console.log(req.body.path);
    req.flash('aircondfixdatevalidationerror',validationres(req).array())
    res.redirect(req.body.path);
}
}