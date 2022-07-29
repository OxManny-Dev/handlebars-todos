const {Model, DataTypes} = require('sequelize');

const sequelize = require('./../config/connection');


class Todo extends Model {
}

Todo.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    todo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    isCompleted: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    modelName: 'todos',
  }
);

module.exports = Todo;