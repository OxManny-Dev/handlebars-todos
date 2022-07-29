const { User } = require('./../models');
const users = require('./users');
const sequelize = require('./../config/connection');

const seeder = async () => {
  // wipes out the user table
  await sequelize.sync({ force: true });
  await User.bulkCreate(users, {
    individualHooks: true,
  });
  process.exit(0);
};



(async () => {
  await seeder();
})();