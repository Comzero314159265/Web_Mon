module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    title_check: { type: DataTypes.BOOLEAN, defaultValue: true },
    content_check: { type: DataTypes.BOOLEAN, defaultValue: true },
    images_check: { type: DataTypes.BOOLEAN, defaultValue: false },
    scripts_check: { type: DataTypes.BOOLEAN, defaultValue: false },
    link_check: { type: DataTypes.BOOLEAN, defaultValue: false },
    refesh_Time: { type: DataTypes.INTEGER, defaultValue: 5 }
  })

  Setting.associate = (models) => {
  }
  return Setting
}
