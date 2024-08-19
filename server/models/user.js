const { hashPassword } = require('../utils/hashPassword')

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	})

	//Hooks
	User.beforeCreate(async User => {
		const hashedPassword = await hashPassword(User.password)
		User.password = hashedPassword
	})

	//Associations
	User.associate = models => {
		User.hasMany(models.Patient, {
			foreignKey: { name: 'user_id', allowNull: false },
		})

		User.hasMany(models.Visitation, {
			foreignKey: { name: 'user_id', allowNull: false },
		})

		User.hasMany(models.Prescription, {
			foreignKey: { name: 'user_id', allowNull: false },
		})

		User.hasMany(models.CheckUpDetail, {
			foreignKey: { name: 'user_id', allowNull: false },
		})

		User.hasMany(models.FollowUpDetail, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
	}

	return User
}
