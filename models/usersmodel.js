const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const userschema = mongoose.Schema({
    email:String,
    password:{
        type:String,
        default:'1234'
    },
    isAdmin1:{
        type:Boolean,
        default:false
    },
    isAdmin2:{
        type:Boolean,
        default:false
    }
})

/*            USERS              */
let theuser = mongoose.model('user',userschema)

exports.postinadduser= (email) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            return theuser.findOne({email:email}).then((user) => {
                if(user){
                    mongoose.disconnect();
                    reject('هذا البريد الالكتروني موجود برجاء ادخال بريد الكتروني اخر')
                }
                else{
                    password = '1234'
                    return bcrypt.hash(password,10)
                }
            }).then(hashedpass => {
                let user = new theuser({
                    email:email,
                    password:hashedpass
                })
                return user.save();
            }).then(() => {
                mongoose.disconnect();
                resolve('user created')
            }).catch(err => {
                mongoose.disconnect();
                reject(err) 
            })
        })
      }
    )
}

exports.getallusers = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theuser.find({isAdmin1:false,isAdmin2:false}).then((users) => {
                mongoose.disconnect();
                resolve(users)
            }).catch(err => reject(err))
        })
      }
    )
}


exports.deletetheuser = (id) => {
    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            theuser.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}



/*            ADMINS              */

exports.postinaddadmin= (email) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            return theuser.findOne({email:email}).then((user) => {
                if(user){
                    mongoose.disconnect();
                    reject('هذا البريد الالكتروني موجود برجاء ادخال بريد الكتروني اخر')
                }
                else{
                    password = '1234'
                    return bcrypt.hash(password,10)
                }
            }).then(hashedpass => {
                let user = new theuser({
                    email:email,
                    password:hashedpass,
                    isAdmin2:true
                })
                return user.save();
            }).then(() => {
                mongoose.disconnect();
                resolve('user created')
            }).catch(err => {
                mongoose.disconnect();
                reject(err) 
            })
        })
      }
    )
}

exports.getalladmins = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theuser.find({isAdmin2:true}).then((admins) => {
                mongoose.disconnect();
                resolve(admins)
            }).catch(err => reject(err))
        })
      }
    )
}

/*                       LOG IN                              */

exports.postinlogin = (email,password)=> {
    //check if email exists
    //no ==> error the email is not found
    //yes ==> check the password
    //no ==> error wrong password
    //yes ==> set session

    return new Promise((resolve,reject) => {
        mongoose.connect(dburl).then(()=>
        theuser.findOne({email:email})
        ).then(userfound => {
            if(!userfound){
                mongoose.disconnect();
                reject("بريد الكتروني غير صحيح");
            }
            else{
                 bcrypt.compare(password,userfound.password).then(same => {
                    if(!same){
                        mongoose.disconnect();
                        reject("كلمة المرور غير صحيحة");
                    }
                    else{
                        mongoose.disconnect()
                        const id = userfound._id
                        const isadmin1 = userfound.isAdmin1
                        const isadmin2 =  userfound.isAdmin2
                        const userdata = {id,isadmin1,isadmin2}
                        resolve(userdata)
                    }
            })
            }
        }).catch(err => {
            mongoose.disconnect();
            reject("err");
        })
    })
}

/*                   ACCOUNT                   */
exports.getaccountbyid = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theuser.findById(id).then((user) => {
                theuser.find({}).then((users) => {
                    mongoose.disconnect();
                    const infoitems = {user,users}
                    resolve(infoitems)
                })
            }).catch(err => reject(err))
        })
      }
    )
}

exports.editpassword = (id,password) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            return bcrypt.hash(password,10).then(hashedpass => {
                return theuser.updateOne({_id : id},{password : hashedpass}).then(() => {
                    mongoose.disconnect();
                    resolve('passo=word changed')
                })
            }).catch(err => reject(err))
        
        })
      }
    )
}

/*                        FOR FORGET PASSWORD            */
exports.updateuserbyemail = (email,newdata) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theuser.updateOne({email : email},newdata).then(() => {
                mongoose.disconnect();
                resolve('password returned')
            }).catch(err => reject(err))
        })
      }
    )
}

exports.postinsignup = (email,password) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            return theuser.findOne({email:email}).then((user) => {
                if(user){
                    mongoose.disconnect();
                    reject('user is exist')
                }
                else{
                    return bcrypt.hash(password,10)
                }
            }).then(hashedpass => {
                let user = new theuser({
                    email:email,
                    password:hashedpass,
                    isAdmin1:true
                })
                return user.save();
            }).then(() => {
                mongoose.disconnect();
                resolve('user created')
            }).catch(err => {
                mongoose.disconnect();
                reject(err) 
            })
        })
      }
    )
}


exports.getthelength = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theuser.find({}).then((users) => {
                mongoose.disconnect();
                resolve(users)
            }).catch(err => reject(err))
        })
      }
    )
}



