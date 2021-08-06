const mongoose = require('mongoose')
const branches = require('./branchesmodel')
const cars = require('./carsmodel')
const fixtypes = require('./fixtypesmodel')
const fixes = require('./fixesmodel')

const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


const userfixesschema = mongoose.Schema({
    branch:String,
    carname:String,
    carinfo:String,
    modifiedcarlicensedate:Date,
    workshop:String,
    counternumber:String,
    startdate : Date,
    enddate : Date,
    fixtype:String,
    fixes:Array,
    notes:String
})

let theuserfixes = mongoose.model('userfix',userfixesschema)

exports.getallinfo = (branch,fixtype) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {  
            branches.getallbranches().then((branches) => {
            fixtypes.getallfixtypes().then((fixtypes) => {
            cars.getcarsbybranch(branch).then((cars) => {
                fixes.getfixesbytype(fixtype).then((fixes) => {
                        mongoose.disconnect();
                        const infoitems = {cars,branches,branch,fixtypes,fixes,fixtype}
                        resolve(infoitems)
                })
            })
            })
            }).catch(err => reject(err))
        })
      }
    )
}


exports.postinadduserfixes = (branch,carname,carinfo,modifiedcarlicensedate,workshop,counternumber,startdate,enddate,fixtype,fixes,notes) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            let userfixes = new theuserfixes({
                branch:branch,
                carname:carname,
                carinfo:carinfo,
                modifiedcarlicensedate:modifiedcarlicensedate,
                workshop:workshop,
                counternumber:counternumber,
                startdate : startdate,
                enddate : enddate,
                fixtype:fixtype,
                fixes:fixes,
                notes:notes
            })
            return userfixes.save();
        }).then(() => {
                mongoose.disconnect();
                resolve()
            })
            .catch(err => reject(err))
        })
}

exports.getallusersfixes = () => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theuserfixes.find({}).then((usersfixes) => {
                mongoose.disconnect();
                resolve(usersfixes)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getusersfixesbyid = (id) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theuserfixes.findById(id).then((userfixes) => {
                mongoose.disconnect();
                resolve(userfixes)
            }).catch(err => reject(err))
        })
      }
    )
}

exports.deleteuserfixes = (id) => {
    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            theuserfixes.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}

exports.getuserfixesbycarname = (branch,name) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            theuserfixes.find({carname:name}, {} , {sort:{Dateoflisting : -1}}).then((cars2) => {
                branches.getallbranches({}).then((branches) => {
                    cars.getcarsbybranch(branch).then((cars) => {
                        mongoose.disconnect();
                        const caritems = {cars,branches,branch,cars2,name}
                        resolve(caritems)
                    })
                })      
            }).catch(err => reject(err))
        })
      }
    )
}

