module.exports = (sequelize, DataTypes) => {
	const Prescription = sequelize.define('Prescription', {
		prescription_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		prescription_details: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		prescription_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		prescription_expiry_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
	})

	//Associations
	Prescription.associate = models => {
		Prescription.belongsTo(models.CheckUpDetail, {
			foreignKey: { name: 'check_up_id', allowNull: false },
		})
		Prescription.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
	}

	return Prescription
}
