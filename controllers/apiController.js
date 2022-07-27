const router = require('express').Router();
const {User} = require('./../models');

/* /api prepended before it*/
router.post('/signup', async (req, res) => {
  try {
    // { username: 'something cool', password: 'password' }
    const newUser = await User.create(req.body);
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


module.exports = router;