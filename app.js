// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const authController = require('./controllers/AuthController')
const userController = require('./controllers/UsersController')
const sysSettingsController = require('./controllers/SystemSettingsController')
const app = express();
const port = process.env.PORT;

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.set('useFindAndModify', false)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({
  extended: true
}))
//use express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: "app_session",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))
app.use(setUserVarMiddleware)


//login route
app.get('/ppms/login', authController.showLogin)

//login route
app.get('/ppms/signup', authController.showSignup)

app.post('/ppms/register', userController.createUser)

// create route
app.post('/ppms/auth', authController.doLogin)

// create route
app.get('/ppms/logout', authController.doLogout)

app.get('/', authenticatedOnlyMiddleware)

//User Dashboard
app.get('/ppms/dashboard', authenticatedOnlyMiddleware, userController.showDashboard)
app.get('/ppms', authenticatedOnlyMiddleware, userController.showDashboard)
//User Profile
app.get('/ppms/myprofile', authenticatedOnlyMiddleware, userController.showProfile)
app.post('/ppms/update_profile', authenticatedOnlyMiddleware, userController.updateProfile)
app.post('/ppms/update_pwd', authenticatedOnlyMiddleware, userController.updatePassword)

//System Settings
app.get('/ppms/settings', authenticatedOnlyMiddleware, sysSettingsController.showSystemSettings)





// connect to DB, then inititate Express app
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    // DB connected successfully
    console.log('DB connection successful')

    app.listen(port, () => {
      console.log(`PPMS app listening on port: ${port}`)
    })
  })
  .catch(err => {
    console.log(err)
  })

  function authenticatedOnlyMiddleware(req, res, next) {
    if ( ! req.session || ! req.session.user ) {
      res.redirect('/ppms/login')
      return
    }

    next()
  }

  function setUserVarMiddleware(req, res, next) {
    // default user template var set to null
    res.locals.user = null

    // check if req.session.user is set,
    // if set, template user var will be set as well
    if (req.session && req.session.user) {
      res.locals.user = req.session.user
      res.locals.displayName = req.session.displayName
    }

    next()
  }
