const users = require('./users/users.service.js');
const files = require('./files/files.service.js');
const uploads = require('./uploads/uploads.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(files);
  app.configure(uploads);
};
