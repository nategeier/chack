/**
 * LoginController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 var GooglePlusStrategy = require('passport-google-plus'),
  passport = require('passport');

passport.use(new GooglePlusStrategy({
    clientId: '695943043901.apps.googleusercontent.com',
    clientSecret: 'QR1HU6_h9LuuvmSRe-GRqG6e'
  },
  function(tokens, profile, done) {
    // Create or update user, call done() when complete...
    console.log(profile, tokens, 'wts')
    done(null, profile, tokens);
  }
));

module.exports = {

  landing: function(req, res) {
    return res.view({
        corndogs: [{name: 'Hank the Corndog'}, {name: 'Lenny the Corndog'}]
    });
  },
  authenticate: function(req, res){
    console.log('authenticate!!!!!!!')

  },

  destroy: function(req, res) {

  },

  tag: function(req, res) {

  },

  like: function(req, res) {

  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to LoginController)
   */
  _config: {}

  
};
