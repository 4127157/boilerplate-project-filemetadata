var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
var upload = multer().single('upfile');


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload, (req, res) => {
    if(req.file) {
        console.log(req.file);
        res.json({
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        });
    } 
    else {
        req.json({
            error: "No file selected"
        });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
