'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(`Todos`, `UserId`, {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint(`Todos`, {
      fields: [`UserId`],
      type: `foreign key`,
      name: `user_fk`,
      references: {
        table: `Users`,
        field: `id`
      },
      onDelete: `cascade`,
      onUpdate: `cascade`
    })
  },


  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(`Todos`, `UserId`)
    await queryInterface.removeConstraint(`Todos`, `user_fk`)
  }
};
