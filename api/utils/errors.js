class NotFound extends Error {
  constructor(errorMessage) {
    super();
    this.message = errorMessage;
    this.missing = [];
  }
}

module.exports = {
  NotFound,
};
