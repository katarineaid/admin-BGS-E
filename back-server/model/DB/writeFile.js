module.exports = async function (params, fs, api) {
  return await writeFile(params, fs, api);
};

async function writeFile(params, fs) {
  const { filePath, fileData } = params;
  return new Promise(async function (resolve, reject) {
    fs.writeFile(filePath, fileData, (err) => {
      if (err) return resolve({
        status: false,
        statusText: `Произошла ошибка при записи ${filePath}`
      });
      resolve({
        status: true,
        statusText: 'Файл успешно записан',
        data: filePath,
      })
    })
  })
}