module.exports = (sequelize, DataTypes) => {
	const Sales = sequelize.define('Sales', {
		sales_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		totalPrice: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		saleDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	})

	//Associations
	Sales.associate = models => {
		Sales.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})

		Sales.belongsTo(models.Patient, {
			foreignKey: { name: 'patient_id', allowNull: false },
		})

		Sales.belongsTo(models.Inventory, {
			foreignKey: { name: 'item_id', allowNull: false },
			onDelete: 'CASCADE',
		})
		Sales.belongsTo(models.Billing, {
			foreignKey: { name: 'billing_id', allowNull: false },
			onDelete: 'CASCADE',
		})
	}

	return Sales
}
