module.exports = (sequelize, DataTypes) => {
	const Visitation = sequelize.define('Visitation', {
		visitation_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		visitation_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		visitation_time: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		visitation_type: {
			type: DataTypes.ENUM('follow-up', 'check-up', 'other'),
			allowNull: false,
		},
	})

	Visitation.associate = models => {
		Visitation.belongsTo(models.Patient, {
			foreignKey: { name: 'patient_id', allowNull: false },
		})

		Visitation.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})

		Visitation.hasOne(models.FollowUpDetail, {
			foreignKey: { name: 'visitation_id', allowNull: false },
		})

		Visitation.hasOne(models.CheckUpDetail, {
			foreignKey: { name: 'visitation_id', allowNull: false },
		})
	}
	return Visitation
}
