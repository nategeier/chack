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

var Login = require('../models/Login'),
    clients = require('../adapters/clients'),
    googleapis = require('googleapis'),
    CLIENT_ID = clients.google.id,
    CLIENT_SECRET = clients.google.secret,
    REDIRECT_URL = clients.google.redir,
    OAuth2Client = googleapis.OAuth2Client,
    oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);


module.exports = {

  /**
   * A route for logging in with google+
   * @param  {Object} req Sails request object
   * @param  {Object} res Sails response object
   */
  landing: function(req, res) {
    googleapis
      .discover('plus', 'v1')
      .execute(function(err, client) {
        var url = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: 'https://www.googleapis.com/auth/plus.me'
        });

        res.view({oauthUrl: url});
    });
  },

  /**
   * The google api authentication redirection route
   * @param  {Object} req Sails request object.
   * @param  {[type]} res Sails response object.
   */
  authenticate: function(req, res){
    var code = req.query.code;

    oauth2Client.getToken(code, function(err, tokens) {

      // todo save that token to mongodb
      oauth2Client.credentials = {
        access_token: tokens.access_token
      };

      // For this contrived example, I have to do all of this in the getToken callback
      // because I haven't made a way of persisting the access_token to mongodb, and I need 
      // the credentials to be set on oauth2Client in order to make this data request. 
      // Anyways, this will send back the JSON profile data from g+.
      googleapis
        .discover('plus', 'v1')
        .execute(function(err, client) {
          client
            .plus.people.get({userId: 'me'})
            .withAuthClient(oauth2Client)
            .execute(function(err, result, body) {
              if (!err) {
                res.json(result);
              }
            });        
      });
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
