const User = require('./User');
const Cocktail = require('./Cocktail');

User.hasMany(Cocktail, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Cocktail.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Cocktail };
