module.exports = (sequelize, DataTypes) => {
	const Patient = sequelize.define(
		'Patient',
		{
			patient_id: {
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
			gender: {
				type: DataTypes.ENUM('Male', 'Female', 'Other'),
				allowNull: false,
			},
			date_of_birth: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			contact_number: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
			},
			address: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			medical_conditions: {
				type: DataTypes.TEXT,
			},
			latest_eye_checkup: {
				type: DataTypes.JSON,
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			indexes: [
				{
					unique: true,
					fields: ['first_name', 'last_name', 'date_of_birth'],
				},
			],
		}
	)

	//Associations
	Patient.associate = models => {
		Patient.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
		Patient.hasMany(models.Visitation, {
			foreignKey: { name: 'patient_id', allowNull: false },
			onDelete: 'CASCADE',
		})

		Patient.hasMany(models.Sales, {
			foreignKey: { name: 'patient_id', allowNull: false },
			onDelete: 'CASCADE',
		})
		Patient.hasMany(models.Billing, {
			foreignKey: { name: 'patient_id', allowNull: false },
			onDelete: 'CASCADE',
		})
	}
	return Patient
}
