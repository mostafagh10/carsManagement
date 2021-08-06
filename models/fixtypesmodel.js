const mongoose = require('mongoose');

const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const fixtypesschema = mongoose.Schema({
    name:String
})

let thefixtypes = mongoose.model('fixtype',fixtypesschema)

exports.postinaddfixtype = (name) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thefixtypes.findOne({name:name}).then((fixtype) => {
                if(fixtype){
                    mongoose.disconnect();
                    reject("هذا النوع موجود ... برجاء ادخال نوع اصلاح اخر")
                }
                else{
                    let fixtype = new thefixtypes ({
                        name:name
                    })
                    return fixtype.save().then(() => {
                        mongoose.disconnect();
                        resolve()
                    });
                }
            })
            
        })
            .catch(err => reject(err))
        })
}

exports.getallfixtypes = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thefixtypes.find({}).then((fixtypes) => {
                mongoose.disconnect();
                resolve(fixtypes)
            }).catch(err => reject(err))
        })
      }
    )
}


exports.deletethefixtype= (id) => {
    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            thefixtypes.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}