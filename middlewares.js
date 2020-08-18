const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(fileUpload());
}