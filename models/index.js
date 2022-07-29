const Todo = require('./Todo');
const User = require('./User');

Todo.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Todo, {
  foreignKey: 'userId'
});

module.exports = {
  Todo,
  User,
};