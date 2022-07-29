const Todo = require('./Todo');
const User = require('./User');

Todo.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Todo, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

module.exports = {
  Todo,
  User,
};