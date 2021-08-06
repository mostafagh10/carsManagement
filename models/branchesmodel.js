const mongoose = require('mongoose');

const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const branchschema = mongoose.Schema({
    name:String
})

let thebranch = mongoose.model('branch',branchschema)

exports.postinaddbranch = (name) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thebranch.findOne({name:name}).then((brname) => {
                if(brname){
                    mongoose.disconnect();
                    reject("هذا الفرع موجود... برجاء ادخال اسم فرع اخر")
                }
                else{
                    let branch = new thebranch ({
                        name:name
                    })
                    return branch.save().then(() => {
                        mongoose.disconnect();
                        resolve()
                    });
                }
            })
            /*
            let branch = new thebranch ({
                name:name
            })
            return branch.save();
        }).then(() => {
                mongoose.disconnect();
                resolve()
            */
        })
            .catch(err => reject(err))
        })
}

exports.getallbranches = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thebranch.find({}).then((branches) => {
                mongoose.disconnect();
                resolve(branches)
            }).catch(err => reject(err))
        })
      }
    )
}


exports.deletethebranch = (id) => {
    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            thebranch.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}