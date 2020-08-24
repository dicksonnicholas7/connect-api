'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skills = sequelize.define('Skills', {
    skills_name: DataTypes.STRING
  }, {});
  Skills.associate = function(models) {
    Skills.belongsTo(models.SkillsCategory,{
      foreignKey: 'skills_category_id',
      onUpdate: 'CASCADE'
    });
  };
  return Skills;
};