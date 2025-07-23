const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProjectMember = sequelize.define(
    'ProjectMember',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(20),
        defaultValue: 'editor', // 'editor' or 'viewer'
      },
    },
    {
      tableName: 'project_members',
      schema: 'taskflow',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['project_id', 'user_id'], // Ensures no duplicates
        },
      ],
    }
  );

  return ProjectMember;
};
