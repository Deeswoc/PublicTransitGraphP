let NotFound;
let errorMessage;
let searchID;
async function validate(IDs) {
  const error = new NotFound(errorMessage);
  const results = [];
  for (let i = 0; i < IDs.length; i += 1) {
    results.push(searchID(IDs[i]).then((record) => {
      if (record === null) error.missing.push(IDs[i]);
    }));
  }
  await Promise.all(error.missing);
  if (error.missing.length > 0) {
    throw error;
  }
  return true;
}

module.exports = (dependencies) => {
  NotFound = dependencies.NotFound;
  errorMessage = dependencies.errorMessage;
  searchID = dependencies.searchID;
  return validate;

};
