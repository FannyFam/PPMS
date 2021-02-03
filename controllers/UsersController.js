const uuid = require('uuid')
const SHA256 = require("crypto-js/sha256")
const _ = require('lodash')
const mongoose = require('mongoose')
const UserModel = require('../models/users')

const controllers = {

  createUser: (req, res) => {
    let user_name = req.body.user_name
    let email = req.body.email_address
    let pwd = req.body.password

    // generate uuid as salt
    // go to chrome, npm.js.com/package/uuid v4. uuid is 36 char
    const salt = uuid.v4()

    // hash combination using bcrypt
    const combination = salt + pwd

    // hash the combination using SHA256
    const hash = SHA256(combination).toString()

    UserModel.create({
        user_name: user_name,
        email:email,
        pwsalt: salt,
        hash: hash
      })
      .then(result => {
        res.render('login',{
          successMessage: "Account has been created. Please login."
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/ppms')
      })
  },

  showDashboard: (req, res) => {
    res.render('dashboard')
  },

  showProfile: (req, res) => {
    UserModel.findOne({
      user_name:req.session.user,
    }).then(result =>{
      res.render('profile',{
        userResult: result,
        viewProfileTab: "active",
        editProfileTab: "",
        changePwdTab: ""
      })
    })
  },

  updateProfile: (req, res) => {
    UserModel.updateOne({
      user_name: req.body.user_name
    }, {
      name:{
        first: req.body.fname,
        last: req.body.lname
      },
      designation: req.body.designation,
      email: req.body.email,
      mobile: req.body.mobile
    }).then(updateResult => {

      UserModel.findOne({
        user_name:req.body.user_name
      }).then(result =>{
        res.render('profile',{
          userResult: result,
          successMessage: "Profile updated successfully!",
          viewProfileTab: "",
          editProfileTab: "active",
          changePwdTab: ""
        })

    }).catch(err => {
      console.log(err)
      res.redirect('/ppms')
    })
  })
},

updatePassword: (req, res) => {
    const {curr_pwd, new_pwd, conf_new_pwd} = req.body

    UserModel.findOne({
      user_name:req.session.user,
    }).then(userResult =>{

      // combine DB user salt with given password, and apply hash algo
      const hash = SHA256(userResult.pwsalt + curr_pwd).toString()

      if(hash != userResult.hash){
        res.render('profile',{
          errorMessage: "Current password is wrong",
          userResult: userResult,
          viewProfileTab: "",
          editProfileTab: "",
          changePwdTab: "active"
        })
      }else if(new_pwd != conf_new_pwd){
        res.render('profile',{
          errorMessage: "New password and confirm password does not match",
          userResult: userResult,
          viewProfileTab: "",
          editProfileTab: "",
          changePwdTab: "active"
        })
      }else{

        const salt = uuid.v4()
        const combination = salt + new_pwd
        const hash = SHA256(combination).toString()

        UserModel.updateOne({
          user_name:req.session.user,
        }, {
          pwsalt: salt,
          hash: hash
        }).then(result => {
          res.render('profile',{
            successMessage: "Password has been changed successfully!",
            userResult: userResult,
            viewProfileTab: "",
            editProfileTab: "",
            changePwdTab: "active"
          })
        })
      }
    })
},

}

module.exports = controllers
