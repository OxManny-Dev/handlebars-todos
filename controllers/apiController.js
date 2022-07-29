const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {Todo, User} = require('./../models');


router.post('/todos', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({error: 'You must be logged in to do that'});
  }
  try {
    const newTodo = await Todo.create({
      todo: req.body.todo,
      userId: req.session.user.id,
    });
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
});


/* /api prepended before it*/
router.post('/signup', async (req, res) => {
  try {
    // { username: 'something cool', password: 'password' }
    const newUser = await User.create(req.body);
    // req.session object will persist on every route as long as the cookie is valid
    // we can store as many things in the req.session object as we want
    // in order to save things to the req.session object we need to call .save on it
    // and pass it a callback and do our saving in the callback
    req.session.save(() => {
      req.session.user = newUser;
      req.session.isLoggedIn = true;
      res.json(newUser);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
});


router.post('/signin', async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!existingUser) {
      return res.status(401).json({error: 'Invalid Credentials'});
    }

    const doesPasswordMatch = await bcrypt.compare(req.body.password, existingUser.password);

    if (!doesPasswordMatch) {
      return res.status(401).json({error: 'Invalid Credentials'});
    }

    req.session.save(() => {
      req.session.user = existingUser;
      req.session.isLoggedIn = true;
      res.json({success: true});
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
});


router.post('/signout', async (req, res) => {
  console.log('im out here');
  if (req.session.isLoggedIn) {
    console.log('im out ghere');
    req.session.destroy(() => {
      res.send(true);
    });
  }
});


module.exports = router;