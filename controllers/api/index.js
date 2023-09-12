const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cocktailRoutes = require('./cocktailRoutes');

router.use('/users', userRoutes);
router.use('/cocktails', cocktailRoutes);

module.exports = router;
