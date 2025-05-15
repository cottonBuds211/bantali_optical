module.exports = (sequelize, DataTypes) => {
	const Log = sequelize.define('Log', {
		log_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		reference_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		action: {
			type: DataTypes.ENUM('CREATE', 'EDIT', 'DELETE', 'LOGIN'),
			allowNull: false,
		},
		action_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		details: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})

	//Associations
	Log.associate = models => {
		Log.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
	}

	return Log
}
