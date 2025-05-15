module.exports = (sequelize, DataTypes) => {
	const Appointment = sequelize.define(
		'Appointment',
		{
			appointment_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			appointment_date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			appointment_time_start: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			isArchived: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			appointment_time_end: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			reason_for_rejection: {
				type: DataTypes.STRING,
			},
			status: {
				type: DataTypes.ENUM(
					'Accepted',
					'Pending',
					'Rejected',
					'Cancelled',
					'Completed',
					'Missed'
				),
				defaultValue: 'Pending',
			},
		},
		{
			indexes: [
				{
					unique: true,
					name: 'appointment_unique_constraint',
					fields: ['first_name', 'last_name', 'appointment_date'],
					where: {
						status: ['Pending', 'Accepted'],
					},
				},
			],
		}
	)

	//Associations
	Appointment.associate = models => {
		Appointment.hasMany(models.Notification, {
			foreignKey: { name: 'appointment_id', allowNull: false },
		})
		Appointment.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: true },
		})
	}

	return Appointment
}
