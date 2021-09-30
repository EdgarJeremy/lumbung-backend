// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const swf = require('simple-video-converter');
const isVideo = require('is-video');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const getDimensions = require('get-video-dimensions');

const c720 = {
  video: {
    codec: 'libx264',
    format: 'mp4',
    quality: 25,
    resolution: '1280x720'
  },
  audio: {
    codec: 'aac',
    bitrate: '128k',
    rate: 48000
  }
};
const c480 = {
  ...c720,
  video: {
    ...c720.video,
    resolution: '854x480'
  }
};

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, data: { name }, params: { file, user } } = context;
    if (isVideo(file.path)) {
      const dimensions = await getDimensions(file.path);
      const fileinfo = file.filename.split('.');
      if (dimensions.height === 1080) {
        const id720 = uuid();
        const id480 = uuid();
        swf.single(c720)(file.path, `./storage/${id720}.mp4`, recordFile(app, id720, name, '720', user, fileinfo[0]));
        swf.single(c480)(file.path, `./storage/${id480}.mp4`, recordFile(app, id480, name, '480', user, fileinfo[0]));
      } else if (dimensions.height === 720) {
        const id480 = uuid();
        swf.single(c480)(file.path, `./storage/${id480}.mp4`, recordFile(app, id480, name, '480', user, fileinfo[0]));
      }
    }
    return context;
  };
};

function recordFile(app, id, name, quality, user, originalId) {
  const fileService = app.service('files');
  return async () => {
    const stat = fs.statSync(`./storage/${id}.mp4`);
    await fileService.create({
      id: id,
      name: name + ` [${quality}p].mp4`,
      size: stat.size,
      path: `storage/${id}.mp4`,
      userId: user.id,
      fileId: originalId
    });
  }
}