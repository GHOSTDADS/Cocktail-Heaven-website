const router = require('express').Router();
const { Cocktail } = require('../../models');

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

    res.status(200).json(cocktailData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
