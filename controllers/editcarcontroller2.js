const carsmodel = require('../models/carsmodel')
const session = require('express-session')
const validationres = require('express-validator').validationResult


exports.getcar = (req,res,next) => {
    let id = req.params.id;
    carsmodel.getcarsbyid(id).then(car => {
    res.render('cars_edit2',{
        car : car,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        carlicensedatevalidation : req.flash('carlicensedatevalidationerror')[0],
        successedit2validation : req.flash('successedit2validationmessage')[0],
        pagetitle:"change car_license date"
    })
})
}

exports.updatecarlicensedate = (req,res,next) => {
    if(validationres(req).array().length == 0){
    carsmodel.editcar(req.body.carid,{carlicense_date:req.body.carlicense_date}).then(() => {
        res.redirect(req.body.path)
        req.flash('successedit2validationmessage','تم تعديل تاريخ ترخيص السيارة بنجاح')
    }).catch(err => {
        console.log(err)
        res.redirect(req.body.path);
    })
}
else{
    console.log(req.body.path);
    req.flash('carlicensedatevalidationerror',validationres(req).array())
    res.redirect(req.body.path);
}
}