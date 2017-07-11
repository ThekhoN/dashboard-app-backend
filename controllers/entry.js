// const userData = require('../models/userDataSchema');

/*
const entry = {
  // get
  getAllEntries: (req, res, next) => {
    Entry.find({}, (err, entries) => {
      if (err) {
        return next(err);
      } else {
        // console.log('entries.length: ', entries.length);
        res.send(entries);
      }
    });
  },
  getAllEntriesByDate: (req, res, next) => {
    Entry.find().sort({updated: -1}).exec((err, entries) => {
      if (err) {
        return next(err);
      } else {
        res.send(entries);
      }
    });
  },
  getEntryById: (req, res, next) => {
    const id = req.params._id;
    Entry.findOne({_id: id}, (err, entry) => {
      if (err) {
        return next(err);
      } else {
        res.send(entry);
      }
    });
  },
  getEntryByAuthor: (req, res, next) => {
    const author = req.params._author;
    console.log('author: ', author);
    Entry.find({author: author}, (err, entry) => {
      if (err) {
        return next(err);
      } else {
        res.send(entry);
      }
    });
  },
  // post
  addEntry: (req, res, next) => {
    const text = req.body.text;
    const author = req.body.author;
    const tag = req.body.tag || [];
    if (!text || !author) {
      return res.status(422).send({error: 'journal entry text and author are required'});
    }
    const newEntry = new Entry({text, author, tag});
    newEntry.save((err) => {
      if (err) {
        return next(err);
      }
      return res.send(newEntry);
    });
  },
  updateEntryById: (req, res, next) => {
    const id = req.params._id;
    const text = req.body.text;
    const author = req.body.author;
    const tag = req.body.tag ? req.body.tag : [];
    if (!text || !author) {
      return res.status(422).send({error: 'entry text and author are required'});
    }
    Entry.findOneAndUpdate({_id: id}, {$set: {text, author, tag}}, {new: true}, (err, entry) => {
      if (!entry) {
        return res.status(422).send({error: 'entry with given id does not exist'});
      }
      if (err) {
        return next(err);
      }
      return res.send(entry);
    });
  },
  // delete
  deleteEntryById: (req, res, next) => {
    const id = req.params._id;
    Entry.find({_id: id}).remove().exec((err, entry) => {
      if (err) {
        return next(err);
      } else {
        res.send('entry was removed. . .');
      }
    });
  }
};

module.exports = entry;
*/
