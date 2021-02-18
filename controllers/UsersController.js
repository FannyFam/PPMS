const uuid = require('uuid')
const SHA256 = require("crypto-js/sha256")
const _ = require('lodash')
const mongoose = require('mongoose')
const UserModel = require('../models/users')
const ProjReqModel = require('../models/project_requests')

const controllers = {

  createUser: (req, res) => {
    // let user_name = req.body.user_name
    // let email = req.body.email
    let pwd = req.body.password
    // let first_name = req.body.first_name
    // let last_name = req.body.last_name
    // let designation = req.body.designation

    // generate uuid as salt
    // go to chrome, npm.js.com/package/uuid v4. uuid is 36 char
    const salt = uuid.v4()

    // hash combination using bcrypt
    const combination = salt + pwd

    // hash the combination using SHA256
    const hash = SHA256(combination).toString()

    //create in moongdb == models - users.js
    UserModel.create({
      user_name: req.body.user_name,
      email: req.body.email,
      pwsalt: salt,
      hash: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      designation: req.body.designation
    })
      .then(result => {
        res.render('login', {
          successMessage: "Account has been created. Please login."
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/ppms')
      })
  },

  showDashboard: (req, res) => {
    //Get all Project Requests and store in session
    ProjReqModel.find().sort({
      _id: -1
    }).then(results => {
      //res.render pass plocal variable to the view 15 Feb
      res.render('dashboard', {
        projReqList: results
      })
    })
  },

  showProfile: (req, res) => {
    UserModel.findOne({
      user_name: req.session.user,
    }).then(result => {
      res.render('profile', {
        userResult: result,
        viewProfileTab: "active",
        editProfileTab: "",
        changePwdTab: ""
      })
    })
  },

  updateProfile: (req, res) => {
    console.log(req.body)
    UserModel.updateOne(
      { user_name: req.session.user },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        designation: req.body.designation,
        mobile: req.body.mobile
      }).
      then(updateResult => {
        UserModel.findOne({
          user_name: req.session.user,
        }).then(result => {
          res.render('profile', {
            userResult: result,
            successMessage: "Profile updated successfully!",
            viewProfileTab: "",
            editProfileTab: "active",
            changePwdTab: ""
          })
        })
      })
  },


  updatePassword: (req, res) => {
    const { curr_pwd, new_pwd, conf_new_pwd } = req.body

    UserModel.findOne({
      user_name: req.session.user,
    }).then(userResult => {

      // combine DB user salt with given password, and apply hash algo
      const hash = SHA256(userResult.pwsalt + curr_pwd).toString()

      if (hash != userResult.hash) {
        res.render('profile', {
          errorMessage: "Current password is wrong",
          userResult: userResult,
          viewProfileTab: "",
          editProfileTab: "",
          changePwdTab: "active"
        })
      } else if (new_pwd != conf_new_pwd) {
        res.render('profile', {
          errorMessage: "New password and confirm password does not match",
          userResult: userResult,
          viewProfileTab: "",
          editProfileTab: "",
          changePwdTab: "active"
        })
      } else {

        const salt = uuid.v4()
        const combination = salt + new_pwd
        const hash = SHA256(combination).toString()

        UserModel.updateOne({
          user_name: req.session.user,
        }, {
          pwsalt: salt,
          hash: hash
        }).then(result => {
          res.render('profile', {
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
