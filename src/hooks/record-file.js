// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, data: { name }, params: { file, user } } = context;
    const fileService = app.service('files');
    const fileinfo = file.filename.split('.')
    await fileService.create({
      id: fileinfo[0],
      name: name + '.' + fileinfo[fileinfo.length - 1],
      size: file.size,
      path: file.path,
      userId: user.id
    });
    return context;
  };
};
