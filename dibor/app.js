const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chat = require('./routes/chat');

require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING,
{ useNewUrlParser: true,
        useUnifiedTopology: true
    });

/*    build of the app will be in the public
app.use(express.static('public'))
*/
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use('/api/Chats', chat);
app.listen(process.env.PORT);