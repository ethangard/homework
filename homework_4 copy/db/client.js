// This file is necessary to configure an environment where the server's database can connect with HTTP requests sent by the client

// Set environment
const environment = process.env.NODE_ENV || 'development';

//Load exported configureation from our knexfile.js
const config = require('../knexfile');

// grab the environment that you want to connect to
const environementConfig = config[environment];

// require knex
const knex = require('knex');
const connection = knex(environementConfig);

module.exports = connection;
