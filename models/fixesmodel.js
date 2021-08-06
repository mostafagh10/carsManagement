const mongoose = require('mongoose');
const thefixestypes = require('./fixtypesmodel')

const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const fixesschema = mongoose.Schema({
    fixtype:String,
    name:String
})

let thefixes = mongoose.model('fix',fixesschema)

exports.postinaddfixes = (fixtype,name) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            let fix = new thefixes ({
                fixtype:fixtype,
                name:name
            })
            return fix.save();
        }).then(() => {
                mongoose.disconnect();
                resolve()
            })
            .catch(err => reject(err))
        })
}

exports.getallfixes = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thefixes.find({}).then((fixes) => {
                thefixestypes.getallfixtypes().then((fixestypes) => {
                    mongoose.disconnect();
                    const fixitems = {fixes,fixestypes}
                    resolve(fixitems)
                })
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getfixesbytype = (fixtype) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thefixes.find({fixtype:fixtype}).then((fixes) => {
                mongoose.disconnect();
                resolve(fixes)
            }).catch(err => reject(err))
        })
      }
    )
}


exports.deletethefix= (id) => {
    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            thefixes.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}