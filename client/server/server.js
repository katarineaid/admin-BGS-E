let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let app = express();
let router = express.Router();

let routes = require('../routes');
routes(router);

let address = 'localhost';
const PORT = 9000;


app.use(cookieParser());
app.use(express.static(__dirname + '/../dist'));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: false, limit: '500mb' }));
app.use('/', router);


app.listen(PORT, () => {
  console.log('+------------------------------------------------------------+');
  console.log('| System is up and running. Copy the URL below and open this |');
  console.log('| in your browser: http://' + address + ':' + PORT + '/sign_in                 |');
  console.log('+------------------------------------------------------------+');
});
