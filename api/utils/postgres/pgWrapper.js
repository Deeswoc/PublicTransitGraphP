const { Pool } = require('pg');

// function setResponse(error, results) {
//   return {
//     error,
//     results: results || null,
//   };
// }

function query(queryString, cbFunc) {
  const pool = new Pool();

  pool.query(queryString, (error, results) => {
    cbFunc(error, results);
  });
}

module.exports = {
  query,
};
