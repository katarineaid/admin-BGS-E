module.exports = async function (params, fs, api) {
  return await readFile(params, fs, api);
};

async function readFile(filePath, fs) {
  return new Promise(async function (resolve, reject) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return resolve({
        status: false,
        statusText: `Произошла ошибка при чтении ${filePath}`
      });
      resolve({
        status: true,
        statusText: 'Данные прочитаны',
        data: JSON.parse(data),
      })
    })
  })
}