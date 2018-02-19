module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define('notes', {
    noteId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    note: DataTypes.STRING,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return notes;
};
