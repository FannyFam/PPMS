// declare all node js and controller dependancies
// =======================================
//              DEPENDENCIES
// =======================================
// Import at the top
require('dotenv').config()
// use express in apps.js by requiring it
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
// Insert the controller files
const session = require('express-session')
const bodyParser = require('body-parser')
const authController = require('./controllers/AuthController')
const userController = require('./controllers/UsersController')
const projReqController = require('./controllers/ProjectRequestController')
var moment = require('moment');
moment().format();
const app = express();
// const port = process.env.PORT;
// heroku const port = process.env.PORT || 5000
// =======================================
//              MONGOOSE
// =======================================
// db connection string
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.set('useFindAndModify', false)

// =======================================
//              EXPRESS SETUP
// =======================================
// sets template engine to use
// declare using ejs
app.set('view engine', 'ejs')

// tells Express app where to find our static assets
app.use(express.static('public'))

// tells Express app to make use of the imported method-override library
app.use(methodOverride('_method'))

// bodyparser - used for form submission
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//use express-session, secured session, authentication - copied from previous project
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: "app_session",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 7200000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))
app.use(setUserVarMiddleware)

// =======================================
//              ROUTES
// =======================================

//login route
app.get('/ppms/login', authController.showLogin)

//login route
app.get('/ppms/signup', authController.showSignup)

app.post('/ppms/register', userController.createUser)

// create route
app.post('/ppms/auth', authController.doLogin)

// create route
app.get('/ppms/logout', authController.doLogout)

//check whether if the user hav valid session or not. 
app.get('/', authenticatedOnlyMiddleware)

//User Dashboard
app.get('/ppms/dashboard', authenticatedOnlyMiddleware, userController.showDashboard)
app.get('/ppms', authenticatedOnlyMiddleware, userController.showDashboard)

//User Profile
app.get('/ppms/myprofile', authenticatedOnlyMiddleware, userController.showProfile)
app.post('/ppms/update_profile', authenticatedOnlyMiddleware, userController.updateProfile)
app.post('/ppms/update_pwd', authenticatedOnlyMiddleware, userController.updatePassword)

//Demand Management
app.get('/ppms/demand/project_request', authenticatedOnlyMiddleware, projReqController.newProjectRequest)
app.post('/ppms/create_proj_req', authenticatedOnlyMiddleware, projReqController.createProjectRequest)
app.post('/ppms/update_proj_req', authenticatedOnlyMiddleware, projReqController.updateProjectRequest)
app.get('/ppms/demand/project_request/:pr_code', authenticatedOnlyMiddleware, projReqController.viewProjectRequest)
app.post('/ppms/post_comment', authenticatedOnlyMiddleware, projReqController.postComment)

// connect to DB, then inititate Express app
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(response => {
    // DB connected successfully
    console.log('DB connection successful')

    /*app.listen(port, () => {
      console.log(`PPMS app listening on port: ${port}`)
    })*/

    //heroku - use env.port
    app.listen(process.env.PORT || 3000, function () {
      console.log(`PPMS app started`)
    });
  })
  .catch(err => {
    console.log(err)
  })

function authenticatedOnlyMiddleware(req, res, next) {
  // no session or no user session. 
  if (!req.session || !req.session.user) {
    // redirect to login page
    res.redirect('/ppms/login')
    return
  }

  next()
}

//set , if there is a session or user session, store user info into template res.locals. allow user to display/proceed
function setUserVarMiddleware(req, res, next) {
  // default user template var set to null
  res.locals.user = null

  // check if req.session.user is set,
  // if set, template user var will be set as well
  if (req.session && req.session.user) {
    res.locals.user = req.session.user
    //display name - 1st name and last name. temporary undefined 
    res.locals.displayName = req.session.displayName
  }
  //ppms/dashboard
  next()
}
