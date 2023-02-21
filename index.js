const express = require('express');
const app = express();
const path = require('path');
const database = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
// passport cookie and sessions
const passport = require('passport');
const localPassport = require('./config/passport-local-stratergy');
const cookieParser = require("cookie-parser");
const session = require("express-session") ;
const MongoStore = require('connect-mongo');
const port = 8000 ;
//social login 
const passportGoogle = require('./config/passport-google-oauth-stratergy')

app.use(sassMiddleware({
    src :'./assets/scss',
    dest :'./assets/css',
    debug : false,
    outputStyle :'extended',
    prefix : '/css'
}));
app.use(expressLayouts);
app.use(express.urlencoded());

// sessions and cookie parsing 
app.use(cookieParser());
app.use(session({
    secret: "spoti",
    saveUninitialized:false,
    resave: false ,
    cookie: {
         maxAge: 1000 * 60 *100
        },
    store: MongoStore.create({
        client : database.getClient() ,
        autoRemove : 'disabled'
    },function(err){
        console.log(err || 'Connnect-mongodb setup ok')
    })
}));
//passport iniatialisation 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



 //extracting style and scripts from the subpages into the  layout //views setup 
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static(path.join(__dirname,'assets')));


app.use('/',require('./routes'));
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})