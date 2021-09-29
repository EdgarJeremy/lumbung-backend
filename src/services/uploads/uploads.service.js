// Initializes the `uploads` service on path `/uploads`
const { Uploads } = require('./uploads.class');
const hooks = require('./uploads.hooks');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storage');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
    const name = uuid() + '.' + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/uploads', upload.single('uri'), (req, res, next) => {
    req.feathers.file = req.file;
    next();
  }, new Uploads(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
