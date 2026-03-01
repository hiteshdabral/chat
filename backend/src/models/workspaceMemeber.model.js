const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class WorkspaceMember extends Model {
    static associate(models) {
      WorkspaceMember.belongsTo(models.Workspace, {
        foreignKey: 'workspaceId',
        as: 'workspace',
      });
      WorkspaceMember.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  WorkspaceMember.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      workspaceId: {
        type: DataTypes.UUID,
        field: 'workspace_id',
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isIn: ['owner', 'admin', 'member'],
        },
      },
    },
    {
      sequelize,
      tableName: 'workspace_members',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return WorkspaceMember;
};
