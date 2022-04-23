const express = require('express');
const cors = require('cors');
const app = express();
const login = require('./routes/login');
const users = require('./routes/users');
const notes = require('./routes/notes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

app.use('/login', login);
app.use('/users', users);
app.use('/:user/notes', notes);

app.get('/', function(req, res){
    res.send("Holi qui til");
});

app.listen(3016, function(){
    console.log("Puerto en el 3016, vayan pasando");
});