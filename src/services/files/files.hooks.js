const { authenticate } = require('@feathersjs/authentication').hooks;

const attachUser = require('../../hooks/attach-user');

const removeFile = require('../../hooks/remove-file');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [attachUser()],
    get: [attachUser()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [removeFile()]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
