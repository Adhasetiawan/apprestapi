const express = require('express');
const bodyParser = require("body-parser");
const app = express();


var morgan = require('morgan');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// panggil routes
var routes = require('./routes');
routes(app);

//daftar menu router dari index
app.use('/auth', require('./middleware'));

app.listen(3000, () => {
    console.log(`Server started on port`);
});