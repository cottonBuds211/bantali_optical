'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Auth extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, {
				foreignKey: { name: 'user_id', allowNull: false },
			})
		}
	}
	Auth.init(
		{
			token: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Auth',
		}
	)

	return Auth
}
