const router = require('express').Router();
const { User,Cocktail } = require('../models');
const withAuth = require('../utils/auth');

// GET route with middleware to check if logged in before loading, gets all cocktail table data to pass to the homepage handlebars file.
router.get('/', withAuth, async (req, res) => {
  try {
    const cocktailData = await Cocktail.findAll({ 
     });

    const cocktails = cocktailData.map((cocktail) => cocktail.get({ plain: true }));

    res.render('homepage', {
      cocktails,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET route to grab a single cocktails data from cocktail table with the user id and name that created the cocktail, and pass that through to the cocktail handlebars file.
router.get('/cocktail/:id', withAuth, async (req, res) => {
  try {
    const cocktailData = await Cocktail.findByPk(req.params.id,{
     include: [
      {
        model: User,
        attributes: ['id', 'name']
      }
     ]    
    });

    const cocktail = cocktailData.get({ plain: true });

    res.render('cocktail', {
      ...cocktail,
      current_user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET route that gets the logged in users data from  the user table and passes it through to the profile handlebars file.
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id,{
     attributes: {exclude:['password']},
     include: [{model:Cocktail}]
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/terms-and-conditions', (req, res) => {
  res.render('termsAndConditions'); // This refers to 'termsAndConditions.hbs' file in the views folder.
});

module.exports = router;
