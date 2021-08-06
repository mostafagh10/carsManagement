const userfixesmodel = require('../models/userfixesmodel')
const session = require('express-session')
const fs = require('fs')
const csv = require('fast-csv')
const json2xls = require('json2xls')

exports.getusersfixes = (req,res,next) => {
    let branch = req.query.branchname
    let carname = req.query.carname
    userfixesmodel.getuserfixesbycarname(branch,carname).then(infoitems => {
    res.render('fixesofusers',{
        infoitems : infoitems,
        isuser:req.session.userID,
        isadmin1:req.session.userisadmin1,
        isadmin2:req.session.userisadmin2,
        successdownloadvalidation : req.flash('successdownloadvalidationmessage')[0],
        pagetitle:"fixes of users"
    })
})
}

exports.postdownload = (req,res,next) => {
// get the userfixes
userfixesmodel.getusersfixesbyid(req.body.fixesid).then((userfixes)=> {
    const userfixesjson = JSON.stringify(userfixes)
    const userfixesdata = JSON.parse(userfixesjson)
    const userfixes2 = {
        "رقم السيارة" : userfixesdata.carname,
        "الفرع" : userfixesdata.branch,
        "معلومات عن السيارة" : userfixesdata.carinfo,
        "تاريخ الترخيص معدلة من قبل المستخدم" : userfixesdata.modifiedcarlicensedate,
        "الورشة" : userfixesdata.workshop,
        "رقم العداد" : userfixesdata.counternumber,
        "تاريخ بداية الاصلاح" : userfixesdata.startdate,
        "تاريخ نهاية الاصلاح" : userfixesdata.enddate,
        "نوع الاصلاح" : userfixesdata.fixtype,
        "الاصلاحات" : userfixesdata.fixes,
        "ملاحظات اضافية" : userfixesdata.notes
    }
    const userfixes2json = JSON.stringify(userfixes2)
    // make random id
function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}
var x = makeid(5)+'.xlsx';
var xls = json2xls(JSON.parse(userfixes2json))
const file = `${__dirname}/user_fixes.xlsx`;
const file2 = `${__dirname}/user_fixes2.xlsx`;
//'assets/images/user_fixes.xlsx'
fs.writeFileSync(file,xls,'binary');
var rs = fs.createReadStream(file)
var ws = fs.createWriteStream(file2)
rs.pipe(ws)


    //var y =  'the information of car number ' + userfixesdata.carname + ' is saved in file ' + x;
    
    req.flash('successdownloadvalidationmessage','تم تنزيل الملف')
    res.redirect(req.body.path)
}).catch(err => {
    console.log(err)
    res.redirect('/fixesofusers')
})
}

exports.deleteuserfixes = (req,res,next) => {
    userfixesmodel.deleteuserfixes(req.body.userfixesid).then(() => {
        res.redirect(req.body.path)
    }).catch(err => {
        console.log(err);
    })
}