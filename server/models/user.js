const { hashPassword } = require('../utils/hashPassword')
const bcrypt = require('bcrypt')

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
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		role: {
			type: DataTypes.ENUM('Staff', 'Admin'),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		temp_password: {
			type: DataTypes.STRING,
		},
		temp_password_expires: {
			type: DataTypes.DATE,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			default: true,
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

		User.hasMany(models.Auth, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
		User.hasMany(models.Log, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
		User.hasMany(models.Appointment, {
			foreignKey: { name: 'user_id', allowNull: true },
		})
		User.hasMany(models.Notification, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
		User.hasMany(models.Sales, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
		User.hasMany(models.Inventory, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
		User.hasMany(models.Billing, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
	}

	User.login = async (user_name, password) => {
		const user = await User.findOne({ where: { user_name: user_name } })
		const now = Date.now()
		//console.log(user.temp_password)
		if (user.temp_password && user.temp_password_expires > now) {
			const isMatch = await bcrypt.compare(password, user.temp_password)
			if (isMatch) {
				// user.temp_password = null // Clear temp password after use
				// user.temp_password_expires = null
				// await user.save()
				return user
			}
		}
		if (user) {
			const auth = await bcrypt.compare(password, user.password)

			if (auth && user.active) {
				return user
			}
		}
	}

	return User
}
