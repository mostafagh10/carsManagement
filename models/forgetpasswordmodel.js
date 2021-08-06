const mongoose = require('mongoose');
const theusers = require('./usersmodel')
const bcrypt = require('bcrypt')

const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const forgetpasswordschema = mongoose.Schema({
    email:String
})

let theforgetpassword = mongoose.model('forgetpassword',forgetpasswordschema)

exports.postinaddforgettenpassword= (email) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            let forgetpassword = new theforgetpassword ({
                email:email
            })
            return forgetpassword.save();
        }).then(() => {
                mongoose.disconnect();
                resolve()
            })
            .catch(err => reject(err))
        })
}


exports.getallforgetpasswords = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theforgetpassword.find({}).then((forgetpasswords) => {
                mongoose.disconnect();
                resolve(forgetpasswords)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.deleteforgetpassword = (id) => {
    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theforgetpassword.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve('the password returned')
            }).catch(err => reject(err))
        })
      }
    )
}


exports.returnpassword = (id,email) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            const x = '1234';
            return bcrypt.hash(x,10).then(hashedpass => {
                return theusers.updateuserbyemail(email,{password:hashedpass}).then(() => {
                    this.deleteforgetpassword(id).then(() => {
                        mongoose.disconnect();
                        resolve('the password returned')
                    })
            })
            }).catch(err => reject(err))
        })
      }
    )
}

