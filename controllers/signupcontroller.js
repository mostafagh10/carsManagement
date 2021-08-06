const usersmodel = require('../models/usersmodel')
const session = require('express-session')


exports.getsignup = (req,res,next) => {
    usersmodel.getthelength().then((users) => {
    res.render('signup',{
        userslength:users,
        isuser:false,
        isadmin1:false,
        isadmin2:false,
        pagetitle:"sign up"
    })
})
}

exports.postsignup = (req,res,next) => {
    usersmodel.postinsignup(req.body.email,req.body.password).then(()=> {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
        res.redirect('/signup')
    })
}