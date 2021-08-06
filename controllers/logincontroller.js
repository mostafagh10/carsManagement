const session = require('express-session')
const usersmodel = require('../models/usersmodel')

exports.getlogin = (req,res,next) => {
    usersmodel.getthelength().then((users) => {
        res.render('login',{
            userslength:users,
            isuser : false,
            isadmin1:false,
            isadmin2:false,
            loginflash : req.flash('loginerror')[0],
            pagetitle:"log in"
        });
    })
} 


exports.postlogin = (req,res,next) => {
    usersmodel.postinlogin(req.body.email,req.body.password).then(userdata => {
        req.session.userID = userdata.id,
        req.session.userisadmin1 = userdata.isadmin1,
        req.session.userisadmin2 = userdata.isadmin2
        console.log(usersmodel.x)
        if(userdata.isadmin1 == false && userdata.isadmin2 == false){
            res.redirect('/userfixes')
        }
        else{
            res.redirect('/branch')
        }
    }).catch((err) => {
        console.log(err)
        req.flash('loginerror',err)
        res.redirect('/')
    })
}

exports.postlogout = (req,res,next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}