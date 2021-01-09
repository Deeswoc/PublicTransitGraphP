const express = require('express');
const passport = require('passport');
const pgWrapper = require('../utils/postgres/pgWrapper');

const router = express.Router();
const townModel = require('../models/town/town');

router.get(
  '/',
  (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/authentication/login');
    }
  },
  (req, res) => {
    console.log(passport);
    pgWrapper.query('SELECT * from users', (error, response) => {
      console.log(response.rows);
    });

    res.render('index', { title: 'Public Transit' });
  },
);

router.get('/t', (req, res) => {
  townModel.getTowns().then((towns) => {
    const townArr = [];
    towns.forEach((record) => {
      townArr.push({
        name: record.name,
        // parish: record._fields[0].properties.parish
      });
    });
    res.render('towns', townArr);
  });
});
module.exports = router;
