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

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
