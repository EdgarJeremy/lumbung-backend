/* eslint-disable no-unused-vars */
const si = require('systeminformation');
const os = require('os');
const checkDiskSpace = require('check-disk-space').default;

exports.Specs = class Specs {
  constructor(options) {
    this.options = options || {};
  }

  async get(id, params) {
    if (id === 'cpu') {
      const cl = await si.currentLoad();
      return {
        percentage: parseFloat(cl.currentLoad.toFixed(2))
      };
    } else if (id === 'mem') {
      return await {
        used: os.totalmem() - os.freemem(),
        total: os.totalmem(),
        percentage: parseFloat((((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2))
      };
    } else if (id === 'disk') {
      const ds = await checkDiskSpace('/storage');
      return {
        used: ds.size - ds.free,
        total: ds.size,
        percentage: parseFloat((((ds.size - ds.free) / ds.size) * 100).toFixed(2))
      };
    }
  }
};
