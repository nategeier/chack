/**
 * Login
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var clients = require('../adapters/clients');

var readline = require('readline'),
  googleapis = require('googleapis'),
  OAuth2Client = googleapis.OAuth2Client;

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = clients.google.id,
  CLIENT_SECRET = clients.google.secret,
  REDIRECT_URL = clients.google.redir;


module.exports = {

  getUrl : function(oauth2Client, callback){
    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/plus.me'
    });
    callback(url);
  },

  getAccessToken : function(oauth2Client, callback){

    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/plus.me'
    });

    
    rl.question('Enter the code here:', function(code) {

    // request access token
      oauth2Client.getToken(code, function(err, tokens) {
        // set tokens to the client
        // TODO: tokens should be set by OAuth2 client.
        oauth2Client.credentials = tokens;
        callback && callback();
      });
    });

  },

  getUserProfile: function(client, authClient, userId, callback) {
    client
      .plus.people.get({ userId: userId })
      .withAuthClient(authClient)
      .execute(callback);
  },

  printUserProfile: function(err, profile, callback) {
    if (err) {
      console.log('An error occurred');
    } else {
      console.log(profile.displayName, ':', profile.tagline);
    }
    //callback(profile.displayName, ':', profile.tagline);
  },

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
