const { Op } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	const Inventory = sequelize.define(
		'Inventory',
		{
			item_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			item_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			item_type: {
				type: DataTypes.ENUM('Frame', 'Accessories', 'Other'),
				allowNull: false,
			},
			material: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			color: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},

			stockQuantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			// Table options
			indexes: [
				// Conditional unique index for non-'Frame' item types
				{
					name: 'unique_item_name_condition',
					unique: true,
					fields: ['item_name'],
					where: {
						item_type: {
							[Op.ne]: 'Frame', // Applies only when item_type is not 'Frame'
						},
					},
				},
				// Composite unique index for 'Frame' with item_name and color
				{
					name: 'unique_frame_item_name_color',
					unique: true,
					fields: ['item_name', 'color'],
					where: {
						item_type: 'Frame', // Applies only when item_type is 'Frame'
					},
				},
			],
		}
	)

	//Associations
	Inventory.associate = models => {
		Inventory.hasMany(models.Sales, {
			foreignKey: { name: 'item_id', allowNull: false },
			onDelete: 'CASCADE',
		})
		Inventory.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
	}

	return Inventory
}
