const router = require('express').Router();
const { Cocktail } = require('../../models');

//POST route for adding new cocktails
router.post('/', async (req, res) => {
  try {
    const newCocktail = await Cocktail.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCocktail);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DEL route for deleting cocktails based on ID passed through
router.delete('/:id', async (req, res) => {
  try {
    const cocktailData = await Cocktail.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!cocktailData) {
      res.status(404).json({ message: 'No cocktail found with this id!' });
      return;
    }

    res.status(200).json({ message: "cocktail destroed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT route for updating 'likes' count for he cocktail witht he matching ID passed through
router.put('/:id', async (req,res) => {
  try {
    const cocktail = await Cocktail.update(
      {
        likes: req.body.likes,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(cocktail);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
