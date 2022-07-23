const router = require('express').Router();
const { User } = require('./../models');

const todos = [
  'Run a 5k',
  'Do the laundry',
  'Add more todos',
];

router.get('/', (req, res) => {
  res.render('todos', {
    todos,
    coolestGuyInTheWorld: 'Manny',
    favoriteFood: 'Surf and Turf burrito from the burrito on 16th and Mission',
  });
});

//   HTML ROUTES  + API  POST, DELETE, PUT/PATCH     routes
router.get('/users', async (req, res) => {
  try {
    const dbUsersData = await User.findAll();
    console.log(dbUsersData);
    const users = dbUsersData.map(dbUser => dbUser.get({ plain: true }));
    console.log(users);
    res.render('users', { users });
  } catch (error) {
    console.log('E L:25 homepageController', error);
    res.status(500).json(error);
  }
});


module.exports = router;