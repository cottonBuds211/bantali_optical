module.exports = (sequelize, DataTypes) => {
	const CheckUpDetail = sequelize.define('CheckUpDetail', {
		check_up_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		check_up: {
			type: DataTypes.JSON,
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
	}

	return CheckUpDetail
}
