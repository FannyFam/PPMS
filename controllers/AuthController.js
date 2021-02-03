const uuid = require('uuid')
const SHA256 = require("crypto-js/sha256")
const _ = require('lodash')
const mongoose = require('mongoose')
const UserModel = require('../models/users')

const controllers = {

  showLogin: (req, res) => {
    res.render('login')
  },

  //Perform login validation here
  doLogin: (req, res) => {
    //let email_address = req.body.email_address
    //let password = req.body.password
    const {email_address, password} = req.body

    UserModel.findOne({
      email:email_address,
    }).then(userResult =>{

      // combine DB user salt with given password, and apply hash algo
      const hash = SHA256(userResult.pwsalt + req.body.password).toString()

      if(!userResult){
        res.render('login',{
          errorMessage: "Invalid email or password"
        })
      } else if (hash != userResult.hash){
        res.render('login',{
          errorMessage: "Invalid email or password"
        })
      }else{
        req.session.user = userResult.user_name
        req.session.displayName = userResult.name.first + " " + userResult.name.last
        res.redirect('dashboard')
      }
    }).catch(err => {
      console.log(err)
      res.render('login',{
        errorMessage: "Invalid email or password"
      })
    })
  },

  doLogout: (req, res) => {
    req.session.destroy()
    res.redirect('/ppms')
  },

  showSignup: (req, res) => {
    res.render('register')
  },


}

module.exports = controllers
