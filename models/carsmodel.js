const mongoose = require('mongoose');
const thebranches = require('./branchesmodel')
const carstypes = require('./carstypesmodel')

const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const carsschema = mongoose.Schema({
    branch:String,
    name:String,
    cartype:String,
    model:String,
    aircondition_type:String,
    aircondition_fixdate:Date,
    carlicense_date:Date
})

let thecars = mongoose.model('car',carsschema)

exports.postinaddcars = (branch,name,cartype,model,aircondition_type,aircondition_fixdate,carlicense_date) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecars.findOne({name:name}).then((car) => {
                if(car){
                    mongoose.disconnect();
                    reject("رقم السيارة موجود... برجاء ادخال رقم سيارة اخر")
                }
                else{
                    let car = new thecars ({
                        branch:branch,
                        name:name,
                        cartype:cartype,
                        model:model,
                        aircondition_type:aircondition_type,
                        aircondition_fixdate:aircondition_fixdate,
                        carlicense_date:carlicense_date
                    })
                    return car.save().then(() => {
                        mongoose.disconnect();
                        resolve()
                    });
                }
            })
        })
            .catch(err => reject(err))
        })
}

exports.getallcars = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecars.find({}).then((cars) => {
                thebranches.getallbranches().then((branches) => {
                    carstypes.getallcarstypes().then((carstypes) => {
                        mongoose.disconnect();
                        const caritems = {cars,branches,carstypes}
                        resolve(caritems)
                    })
                })
            }).catch(err => reject(err))
        })
      }
    )
}


exports.getcarsbybranch = (branch) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecars.find({branch:branch}).then((cars) => {
                mongoose.disconnect();
                resolve(cars)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getcarsbynameofcar = (name) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecars.find({name:name}).then((cars) => {
                mongoose.disconnect();
                resolve(cars)
            }).catch(err => reject(err))
        })
      }
    )
}




exports.deletethecar= (id) => {
    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            thecars.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getcarsbyid = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecars.findById(id).then((car) => {
                mongoose.disconnect();
                resolve(car)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.editcar = (id,newdata) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecars.updateOne({_id : id},newdata).then(() => {
                mongoose.disconnect();
                resolve('aircondition date updated')
            }).catch(err => reject(err))
        })
      }
    )
}


exports.getcarsbyname = (branch,name) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecars.find({branch:branch}).then((cars) => {
                thecars.find({name:name}).then((cars2) => {
                        thebranches.getallbranches().then((branches) => {
                        mongoose.disconnect();
                        const caritems = {cars,branches,branch,cars2}
                        resolve(caritems)
                    })
                    })
                }).catch(err => reject(err))
        })
      }
    )
}