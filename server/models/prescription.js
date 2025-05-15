module.exports = (sequelize, DataTypes) => {
	const Prescription = sequelize.define('Prescription', {
		prescription_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		prescription_details: {
			type: DataTypes.JSON,
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
		Prescription.belongsTo(models.Patient, {
			foreignKey: { name: 'patient_id', allowNull: false },
		})
		Prescription.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
	}

	return Prescription
}
