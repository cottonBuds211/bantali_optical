module.exports = (sequelize, DataTypes) => {
	const CheckUpDetail = sequelize.define('CheckUpDetail', {
		check_up_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		visual_acuity_right: {
			type: DataTypes.STRING, // Or appropriate data type
		},
		visual_acuity_left: {
			type: DataTypes.STRING, // Or appropriate data type
		},
		refractive_error_right: {
			type: DataTypes.STRING, // Or appropriate data type
		},
		refractive_error_left: {
			type: DataTypes.STRING, // Or appropriate data type
		},
		intraocular_pressure: {
			type: DataTypes.STRING, // Or appropriate data type
		},
		other_findings: {
			type: DataTypes.TEXT,
		},
	})

	//Associations
	CheckUpDetail.associate = models => {
		CheckUpDetail.belongsTo(models.Visitation, {
			foreignKey: { name: 'visitation_id', allowNull: false },
		})
		CheckUpDetail.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
		CheckUpDetail.hasOne(models.Prescription, {
			foreignKey: { name: 'check_up_id', allowNull: false },
		})
	}

	return CheckUpDetail
}
