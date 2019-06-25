module.exports = async function (params, fs, api) {
  return await readDir(params, fs, api);
};

async function readDir(dirPath, fs) {
  return new Promise(async function (resolve, reject) {
    fs.readdir(dirPath, (err, list) => {
      if (err) return resolve({ status: false });
      resolve({
        status: true,
        list
      })
    })
  })
}