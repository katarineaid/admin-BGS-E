let path = require('path');

function getOne() {
  return async function (req, res) {
    const accessToken = req.cookies.accessToken;
    const originalUrl = req.originalUrl;
    console.log('accessToken', accessToken);
    console.log('originalUrl', originalUrl);
    res.sendFile(path.join(__dirname + '/../../dist/index.html'));
  }
}

module.exports = getOne;