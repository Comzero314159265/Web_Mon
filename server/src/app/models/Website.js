module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: DataTypes.STRING,
    url: DataTypes.TEXT
  })

  Website.associate = (models) => {
  }
  return Website
}
