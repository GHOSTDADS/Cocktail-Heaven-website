const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cocktail extends Model {}

Cocktail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        category: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        alcoholic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Ingredient1: {
            type: DataTypes.STRING,
        },
        Ingredient2: {
            type: DataTypes.STRING,
        },
        Ingredient3: {
            type: DataTypes.STRING,
        },
        Ingredient4: {
            type: DataTypes.STRING,
        },
        Ingredient5: {
            type: DataTypes.STRING,
        },
        Ingredient6: {
            type: DataTypes.STRING,
        },
        Ingredient7: {
            type: DataTypes.STRING,
        },
        Ingredient8: {
            type: DataTypes.STRING,
        },
        Ingredient9: {
            type: DataTypes.STRING,
        },
        Ingredient10: {
            type: DataTypes.STRING,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'cocktail',
      }
)

module.exports = Cocktail;