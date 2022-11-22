const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express(); // crianado a importação

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


require('./controllers/authController')(app);
require('./controllers/investidorController')(app);


let port = process.env.PORT || 8080;

app.listen(port, () => {
   console.log('Server is up and running on port number ' + port);
});
