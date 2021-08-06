const mongoose = require('mongoose');

const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const carstypesschema = mongoose.Schema({
    name:String
})

let thecarstypes = mongoose.model('carstype',carstypesschema)

exports.postinaddcarstype = (name) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecarstypes.findOne({name:name}).then((cartype) => {
                if(cartype){
                    mongoose.disconnect();
                    reject("هذا النوع موجود... برجاء ادخال نوع سيارة اخر")
                }
                else{
                    let carstype = new thecarstypes ({
                        name:name
                    })
                    return carstype.save().then(() => {
                        mongoose.disconnect();
                        resolve()
                    });
                }
            })
        }).catch(err => reject(err))
        })
}

exports.getallcarstypes = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thecarstypes.find({}).then((carstypes) => {
                mongoose.disconnect();
                resolve(carstypes)
            }).catch(err => reject(err))
        })
      }
    )
}


exports.deletethecarstype= (id) => {
    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            thecarstypes.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}