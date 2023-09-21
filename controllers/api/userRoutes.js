const router = require('express').Router();
const { User } = require('../../models');

//POST route for adding new users
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//POST route for loging users into the site
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      console.log("try again");
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//GET route for comparing if a name exists in the user table already.
router.get('/check-username/:name', async (req, res) => {
  try {
    const user = await User.findOne({  where: {name: req.params.name } });
    
    if (user) {
      res.json({ exists: true });
      console.log(user);
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to check name' });
  }
});

//GET route for comparing if a email exists in the user table already.
router.get('/check-email/:email', async (req, res) => {
  try {
    const email = await User.findOne({  where: {email: req.params.email } });
    
    if (email) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to check email' });
  }
});

module.exports = router;
