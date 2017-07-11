const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// db
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/dashboard');
const conn = mongoose.connection;
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const gfs = Grid(conn.db);

// app
const app = express();
// server settings
const port = process.env.PORT || 3092;
app.use(cors());
app.use(bodyParser.json());

// setting up storage using multer-gridfs-storage
const storage = GridFsStorage({
  gfs,
  filename: (req, file, cb) => {
    const datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  },
  // additional metadata
  metadata: (req, file, cb) => {
    cb(null, {originalname: file.originalname});
  },
  root: 'ctFiles' // root name for collection to store file into
});

const upload = multer({
  storage: storage
}).single('file');

app.post('/upload', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({error_code: 1, err_desc: err});
      return;
    }
    res.json({error_code: 0, err_desc: null});
  });
});

app.get('/file/:filename', (req, res) => {
  gfs.collection('ctFiles');

  gfs.files.find({filename: req.params.filename}).toArray(function (err, files) {
    if (err) {
      console.log('error: ', err);
    }
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: 'error'
      });
    }
    // create read stream
    let readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: 'ctFiles'
    });
    // set proper contentType
    res.set('Content-Type', files[0].contentType);
    // return response
    return readstream.pipe(res);
  });
});

app.listen(port, () => {
  console.log('running on 3002. . .');
});
