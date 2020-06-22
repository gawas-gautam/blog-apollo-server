/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('post_meta', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		post_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'posts',
				key: 'id'
			}
		},
		key: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'post_meta',
		timestamps: false
	});
};
