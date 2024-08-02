module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "Entity name (e.g. 'User')",
    validate: (input) => {
      if (!input.trim()) {
        return 'Entity name is required';
      }

      return true;
    },
    format: (input) => {
      return input.trim();
    },
  },
];
