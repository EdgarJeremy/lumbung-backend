// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const fs = require('fs');

module.exports = (options = {}) => {
  return async context => {
    if (context.params.provider) {
      if (context.type === 'before') {
        const files = (await context.app.service('files').find({
          query: {
            fileId: context.id
          }
        })).data;
        for (let i = 0; i < files.length; i++) {
          fs.unlinkSync(files[i].path);
          await context.app.service('files').remove(files[i].id);
        }
      } else if (context.type === 'after') {
        fs.unlinkSync(context.result.path);
      }
    }
    return context;
  };
};
