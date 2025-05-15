module.exports = (sequelize, DataTypes) => {
	const FollowUpDetail = sequelize.define('FollowUpDetail', {
		follow_up_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		reason_for_follow_up: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		doctor_notes: {
			type: DataTypes.STRING,
		},
	})

	//Associations
	FollowUpDetail.associate = models => {
		FollowUpDetail.belongsTo(models.Visitation, {
			foreignKey: { name: 'visitation_id', allowNull: false },
		})
		FollowUpDetail.belongsTo(models.User, {
			foreignKey: { name: 'user_id', allowNull: false },
		})
	}

	return FollowUpDetail
}
