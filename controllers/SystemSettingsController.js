const mongoose = require('mongoose')

const controllers = {

    showSystemSettings: (req, res) => {
      res.render('system_settings')
    },

}

module.exports = controllers