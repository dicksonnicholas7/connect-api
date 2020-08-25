'use strict';
module.exports = (sequelize, DataTypes) => {
  const SkillsCategory = sequelize.define('SkillsCategory', {
    skills_cat_name: DataTypes.STRING,
  }, {});
  SkillsCategory.associate = function(models) {
    // associations can be defined here
    SkillsCategory.hasMany(models.Skills,{
      foreignKey: 'skills_category_id',
      onUpdate: 'CASCADE'
    });
  };
  return SkillsCategory;
};