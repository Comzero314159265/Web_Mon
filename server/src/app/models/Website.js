module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: DataTypes.STRING,
    url: { type: DataTypes.STRING, unique: true },
    stable: DataTypes.STRING,
    screenshot: DataTypes.STRING,
    current: DataTypes.STRING,
    level: { type: DataTypes.INTEGER, defaultValue: 0 }
  })

  Website.associate = (models) => {
  }
  return Website
}
