module.exports = (sequelize, DataTypes) => {
  const Blacklist = sequelize.define('Blacklist', {
    word: DataTypes.STRING
  })

  Blacklist.associate = (models) => {
  }
  return Blacklist
}
