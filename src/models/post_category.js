/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('post_category', {
		post_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'posts',
				key: 'id'
			}
		},
		category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'category',
				key: 'id'
			}
		}
	}, {
		tableName: 'post_category',
		timestamps: false
	});
};
