module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: DataTypes.STRING,
    url: { type: DataTypes.STRING, unique: true },
    prevVersion: DataTypes.STRING,
    CurrentVersion: DataTypes.STRING
  })

  Website.associate = (models) => {
  }
  return Website
}
