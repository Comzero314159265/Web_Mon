module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: DataTypes.STRING,
    url: { type: DataTypes.STRING, unique: true }
  })

  Website.associate = (models) => {
  }
  return Website
}
