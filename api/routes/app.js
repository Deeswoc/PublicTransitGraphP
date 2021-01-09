const express = require('express');
const path = require('path');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/*', (req, res, next) => {
  // let out = path.join(__dirname, '../', 'public', 'app.html');
  res.sendFile(path.join(__dirname, '../', 'react-app', 'app.html'));
});

module.exports = router;
