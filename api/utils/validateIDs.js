let NotFound;
let errorMessage;
let getTown;
async function validate(IDs) {
  const error = new NotFound(errorMessage);
  for (let i = 0; i < IDs.length; i += 1) {
    const town = await getTown(IDs[i]);
    if (town === null) error.missing.push(IDs[i]);
  }
  if (error.missing.length > 0) {
    throw error;
  }
  return true;
}

module.exports = (dependencies) => {
  NotFound = dependencies.NotFound;
  errorMessage = dependencies.errorMessage;
  getTown = dependencies.getTown;
  return {
    validate,
  };
};
