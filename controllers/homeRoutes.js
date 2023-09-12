const router = require('express').Router();
const { User,Cocktail } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
router.get('/', withAuth, async (req, res) => {
  try {
    const cocktailData = await Cocktail.findAll({
    //  include: [
    //   {
    //     model: User,
    //     attributes: ['name']
    //   }
    //  ]   
     });

    const cocktails = cocktailData.map((cocktail) => cocktail.get({ plain: true }));

    res.render('homepage', {
      cocktails,
      // TODO: Add a comment describing the functionality of this property
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/cocktail/:id', withAuth, async (req, res) => {
  try {
    const cocktailData = await Cocktail.findByPk(req.params.id,{
    //  include: [
    //   {
    //     model: User,
    //     attributes: ['name']
    //   }
    //  ]    
    });

    const cocktails = cocktailData.get({ plain: true });

    res.render('cocktail', {
      ...cocktails,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id,{
     attributes: {exclude:['password']},
     include: [{model:Cocktail}]
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      // TODO: Add a comment describing the functionality of this property
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
