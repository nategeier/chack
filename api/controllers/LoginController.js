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



var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;

var Login = require('../models/Login'),
  clients = require('../adapters/clients');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = clients.google.id,
  CLIENT_SECRET = clients.google.secret,
  REDIRECT_URL = clients.google.redir;





module.exports = {

  landing: function(req, res) {

    googleapis
      .discover('plus', 'v1')
      .execute(function(err, client) {

      var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
      // retrieve an access token
      Login.getUrl(oauth2Client, function(url) {
        return res.view({
          oauthUrl: url
        });
      });
    });
  },
  authenticate: function(req, res){

    googleapis.discover('plus', 'v1').execute(function(err, client) {
      var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
      Login.getUserProfile(client, oauth2Client, 'me', Login.printUserProfile);

    });

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
