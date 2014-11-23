function validateRequiredString(string) {
  string = string || '';

  if (string.trim().length === 0) {
    return {
      error: 'Required'
    };
  }
}

module.exports = validateRequiredString;
