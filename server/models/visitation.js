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
		visit_data: {
			type: DataTypes.JSON,
		},
	})

	Visitation.associate = models => {
		Visitation.belongsTo(models.Patient, {
			foreignKey: { name: 'patient_id', allowNull: false },
			onDelete: 'CASCADE',
		})

		Visitation.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})

		Visitation.hasOne(models.Billing, {
			foreignKey: {
				name: 'visitation_id',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		})
	}
	return Visitation
}
