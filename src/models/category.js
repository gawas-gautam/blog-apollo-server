/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('category', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(75),
			allowNull: false
		},
		slug: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'category',
		timestamps: false
	});
};
