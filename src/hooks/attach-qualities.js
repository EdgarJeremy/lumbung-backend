// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.params.provider) {
      for (let i = 0; i < context.result.data.length; i++) {
        const d = context.result.data[i];
        context.result.data[i].qualities = (await context.app.service('files').find({
          query: {
            fileId: d.id
          }
        })).data;
      }
    }
    return context;
  };
};
