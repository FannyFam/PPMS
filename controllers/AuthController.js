const uuid = require('uuid')
const SHA256 = require("crypto-js/sha256")
const _ = require('lodash')
const mongoose = require('mongoose')
const UserModel = require('../models/users')
const ProjReqModel = require('../models/project_requests')

const controllers = {

  showLogin: (req, res) => {
    res.render('login')
  },

  //Perform login validation here
  doLogin: (req, res) => {
    // let email = req.body.email
    // let password = req.body.password
    // const { email, password } = req.body

    //find in mongodb based on email and password entered on login page
    UserModel.findOne({
      email: req.body.email,
    }).then((userResult) => {

      // combine DB user salt with given password, and apply hash algo
      const hash = SHA256(userResult.pwsalt + req.body.password).toString()

      //if no result return from mongdb
      if (!userResult) {
        res.render('login', {
          errorMessage: "Invalid email or password"
        })

        // check if password is correct by comparing hashes
        //user exist in db, check if hash same as db
      } else if (hash != userResult.hash) {
        res.render('login', {
          errorMessage: "Invalid email or password"
        })

        //user exist, has session, set user name in the session
      } else {
        req.session.user = userResult.user_name
        // req.session.displayName = userResult.first_name + " " + userResult.last_name
        req.session.displayName = userResult.user_name
        res.redirect('/ppms/dashboard')
      }
    }).catch(err => {
      console.log(err)
      res.render('login', {
        errorMessage: "Invalid email or password"
      })
    })
  },

  // end the session
  doLogout: (req, res) => {
    req.session.destroy()
    res.redirect('/ppms')
  },

  showSignup: (req, res) => {
    res.render('register')
  },


}

module.exports = controllers
