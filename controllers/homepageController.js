const router = require('express').Router();
const { User } = require('./../models');


router.get('/', (req, res) => res.render('landing_page'));

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