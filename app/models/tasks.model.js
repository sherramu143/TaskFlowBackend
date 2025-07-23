const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING(20),
        defaultValue: 'todo', // 'todo', 'in-progress', 'done'
      },
      priority: {
        type: DataTypes.STRING(20), // 'low', 'medium', 'high'
      },
      due_date: {
        type: DataTypes.DATEONLY,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assigned_to: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'tasks',
      
      timestamps: false,
    }
  );

  return Task;
};
