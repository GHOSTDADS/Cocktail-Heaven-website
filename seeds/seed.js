const sequelize = require('../config/connection');
const { User, Cocktail } = require('../models');

const userData = require('./userData.json');
const cocktailData = require('./cocktailData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const cocktail of cocktailData) {
        await Cocktail.bulkCreate({
            ...cocktail,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();