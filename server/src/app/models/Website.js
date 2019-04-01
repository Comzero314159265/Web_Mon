module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    name: DataTypes.STRING,
    url: { type: DataTypes.STRING, unique: true },
    stable: DataTypes.STRING,
    screenshot: DataTypes.STRING,
    prev: DataTypes.STRING,
    current: DataTypes.STRING
  })

  Website.associate = (models) => {
  }
  return Website
}
