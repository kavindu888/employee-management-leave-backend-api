const controllers = {};

controllers.signUp = require('./signup');
controllers.leave = require('./leave');
controllers.find = require('./findLeave');
module.exports = controllers;