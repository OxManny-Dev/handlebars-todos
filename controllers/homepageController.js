const router = require('express').Router();
const apiController = require('./apiController');
const {Todo, User} = require('./../models');


router.get('/', (req, res) => {

  res.render('landing_page', {
    isLoggedIn: req.session.isLoggedIn || false,
  })
});


//   HTML ROUTES  + API  POST, DELETE, PUT/PATCH     routes
router.get('/users', async (req, res) => {
  console.log(req.session, 'I AM THE SESSION');
  try {
    const dbUsersData = await User.findAll();
    const users = dbUsersData.map(dbUser => dbUser.get({plain: true}));
    res.render('users', {
      users,
      loggedInUser: req.session.user || null,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {

    res.status(500).json(error);
  }
});


router.get('/users/:userId', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.userId);
    const user = userData.get({plain: true});
    res.render('user_profile', {user});
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/todos', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/');
  }

  try {
    const userTodosFromDB = await Todo.findAll({
      where: {
        userId: req.session.user.id,
      },
    });

    const todos = userTodosFromDB.map(todo => todo.get({plain: true}));
    res.render('todos', {
      todos,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }


});


router.use('/api', apiController);


module.exports = router;