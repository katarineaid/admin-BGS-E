module.exports = async function (params, fs, api) {
  return await deleteFile(params, fs, api);
};

async function deleteFile(filePath, fs) {
  return new Promise(function (resolve, reject) {
    fs.lstat(filePath, function (err, stats) {
      if (err) {
        return resolve({
          status: false,
          statusText: 'В пути ' + filePath + ' содержится ошибка',
          data: {},
        });
      }
      if (stats.isDirectory()) {
        return resolve({
          status: false,
          statusText: 'Вы хотите удалить директорию ' + filePath,
          data: {},
        });
      } else {
        fs.access(filePath, function (err) {
          if (err) {
            return resolve({
              status: false,
              statusText: 'Нет прав на удаление данного файла',
              data: {},
            });
          }
          fs.unlink(filePath, function (err) {
            if (err) {
              return resolve({
                status: false,
                statusText: 'Ошибка при удалении файла ' + filePath,
                data: {},
              });
            }
            return resolve({
              status: true,
              statusText: 'Файл удален',
              data: {},
            });
          });
        });
      }
    });
  });
}