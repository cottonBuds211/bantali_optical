module.exports = (sequelize, DataTypes) => {
	const Notification = sequelize.define('Notification', {
		notification_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: DataTypes.ENUM('new_request', 'update'),
			allowNull: false,
		},
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		is_read: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	})

	//Associations
	Notification.associate = models => {
		Notification.belongsTo(models.Appointment, {
			foreignKey: { name: 'appointment_id', allowNull: false },
			onDelete: 'CASCADE', // If an appointment is deleted, the associated notifications are deleted
		})
		Notification.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: true },
		})
	}

	return Notification
}
