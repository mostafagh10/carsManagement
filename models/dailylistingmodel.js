const mongoose = require('mongoose')
const thebranches = require('./branchesmodel')
const thecars = require('./carsmodel')

const dburl = 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


const dailylistingschema = mongoose.Schema({
    carname:String,
    lastcounter : Number,
    presentcounter : Number,
    number_of_liters_of_fuel : Number,
    consumption_rate : Number,
    Dateoflisting : Date
})

let thedailylistings = mongoose.model('dailylisting',dailylistingschema)

exports.getcarsbyname = (branch,name) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            thedailylistings.find({carname:name}, {} , {sort:{Dateoflisting : -1}}).then((cars2) => {
                thebranches.getallbranches({}).then((branches) => {
                    thecars.getcarsbybranch(branch).then((cars) => {
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

exports.postindailylisting = (carname,lastcounter,presentcounter,number_of_liters_of_fuel,consumption_rate,Dateoflisting) => {

    return new Promise((resolve,reject) => {

        mongoose.connect(dburl).then(() => {
            let dailylisting = new thedailylistings({
                carname:carname,
                lastcounter:lastcounter,
                presentcounter:presentcounter,
                number_of_liters_of_fuel:number_of_liters_of_fuel,
                consumption_rate:consumption_rate,
                Dateoflisting:Dateoflisting
            })
            return dailylisting.save();
        }).then(() => {
                mongoose.disconnect();
                resolve()
            })
            .catch(err => reject(err))
        })
}

exports.deletethelisting = (id) => {
    return new Promise((resolve,reject) => {
    
        mongoose.connect(dburl).then(() => {
            thedailylistings.deleteOne({_id : id}).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => reject(err))
        })
      }
    )
}