'use strict';

let todos = require(`./dataawal.json`)
todos.forEach(todo => {
  todo.createdAt = new Date()
  todo.updatedAt = new Date()
});

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(`Todos`, todos, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(`Todos`, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
