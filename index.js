const express = require('express');
const mongoose=require('mongoose');
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()
require('./config/passport')(passport)

var app=express();
const PORT = process.env.PORT||3000;

mongoose.connect(process.env.MONGO_URI).then(console.log("MOngodb connected ...."))
app.use(express.static('public'))
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}))
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongoUrl: 'mongodb://localhost/test-app' }),
    })
  )
  // Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(require("./routes/index"))
app.use('/auth', require('./routes/auth'))

app.listen(PORT,console.log(`listening at ${PORT}`))