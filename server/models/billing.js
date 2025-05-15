module.exports = (sequelize, DataTypes) => {
	const Billing = sequelize.define('Billing', {
		billing_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		service_fee: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		lense_fee: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		discount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		addOns: {
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
		total_amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		initialPayment: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		initialPaymentDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		finalPaymentDate: {
			type: DataTypes.DATE,
		},
		status: {
			type: DataTypes.ENUM('Paid', 'Partial'),
			allowNull: false,
		},
		lineItems: {
			type: DataTypes.ARRAY(DataTypes.JSON), // PostgreSQL supports array of JSON or any datatype
			allowNull: false,
		},
	})

	//Associations
	Billing.associate = models => {
		Billing.belongsTo(models.Visitation, {
			foreignKey: { name: 'visitation_id', allowNull: false },
			onDelete: 'CASCADE',
		})
		Billing.belongsTo(models.Patient, {
			foreignKey: { name: 'patient_id', allowNull: false },
			onDelete: 'CASCADE',
		})
		Billing.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
		Billing.hasMany(models.Sales, {
			foreignKey: { name: 'billing_id', allowNull: false },
			onDelete: 'CASCADE',
		})
	}

	return Billing
}
