const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');
const mongoose = require('mongoose');
const port = config.port || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(config.mongodb, { useNewUrlParser: true }).catch(err => {
    console.log("\x1b[31m[ERROR]", `\x1b[0mMongoose Connection Error: \x1b[31m${err}`);
});

// ============================
//   Public routes
// ============================
app.get('/', async (req, res) => {
    res.render('index');
});

// Launch app on port
app.listen(port, () => console.log('\x1b[31m%s\x1b[0m', '[SERVER]', '\x1b[32m[WEB]\x1b[0m', `Connected @ http://localhost:${port}`));