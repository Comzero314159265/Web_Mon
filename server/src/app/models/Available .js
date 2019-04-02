const Website = require('./Website')

module.exports = (sequelize, DataTypes) => {
  const Available = sequelize.define('Available', {
    websiteID: { type: DataTypes.INTEGER, allowNull: false },
    responseTime: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: -1 }
  })
  Available.associate = (models) => {
    models.belongsTo(Website, {
      foreignKey: 'id',
      sourceKey: 'websiteID',
      references: {
        model: Website,
        key: 'id'
      }
    })
  }
  return Available
}
