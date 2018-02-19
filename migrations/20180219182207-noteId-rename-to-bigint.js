module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('notes', 'noteId');
    queryInterface.addColumn('notes', 'noteId', {
      type: Sequelize.BIGINT,
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('notes', 'noteId');
    queryInterface.addColumn('notes', 'noteId', {
      type: Sequelize.INTEGER,
    });
  },
};
