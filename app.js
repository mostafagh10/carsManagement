const express = require('express')
const path = require('path')
const session = require('express-session');
const sessionstore = require('connect-mongodb-session')(session)
const app = express();
const flash = require('connect-flash')

const STORE = new sessionstore({
    uri : 'mongodb+srv://mostafaghazaly:tsaCFDK0LVvAPYdo@cluster0.lsbie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    collection:'sessions'
})

app.set('view engine','ejs')
app.set('views','views')

app.use(express.static(path.join(__dirname,'assets'))) //assets is the folder contains css files
app.use(session({
    secret:'this is my secret to hash express sessions',
    saveUninitialized:false,
    store:STORE
}))
app.use(flash());

const loginroute = require('./routes/loginroute')
const branchroute = require('./routes/branchesroute')
const carstypesroute = require('./routes/carstypesroute')
const fixtypesroute = require('./routes/fixtypesroute')
const fixroute = require('./routes/fixesroute')
const carsroute = require('./routes/carsroute')
const userfixesroute = require('./routes/userfixesroute')
const usersroute = require('./routes/usersroute')
const adminsroute = require('./routes/adminsroute')
const accountroute = require('./routes/accountroute')
const forgetpasswordroute = require('./routes/forgetpasswordroute')
const forgettenlistroute = require('./routes/forgettenlistroute')
const updatecarroute = require('./routes/editcarroute')
const updatecarroute2 = require('./routes/editcarroute2')
const carssearchroute = require('./routes/carssearchroute')
const fixesofusersroute = require('./routes/fixesofusersroute')
const dailylistingroute = require('./routes/dailylistingroute')
const viewdailylistingroute = require('./routes/viewdailylistingroute')
const signuproute = require('./routes/signuproute')

app.use('/',loginroute)
app.use('/branch',branchroute)
app.use('/carstypes',carstypesroute)
app.use('/fixestypes',fixtypesroute)
app.use('/fixes',fixroute)
app.use('/cars',carsroute)
app.use('/userfixes',userfixesroute)
app.use('/users',usersroute)
app.use('/admins',adminsroute)
app.use('/account',accountroute)
app.use('/forgetpassword',forgetpasswordroute)
app.use('/forgettenlist',forgettenlistroute)
app.use('/updatecar1',updatecarroute)
app.use('/updatecar2',updatecarroute2)
app.use('/carssearch',carssearchroute)
app.use('/fixesofusers',fixesofusersroute)
app.use('/dailylisting',dailylistingroute)
app.use('/viewdailylisting',viewdailylistingroute)
app.use('/signup',signuproute)

const port = process.env.PORT || 3000
app.listen(port , (err) => {
    console.log('the project work on port 3000');
})