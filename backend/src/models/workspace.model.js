const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Workspace extends Model {
    static associate(models) {
      Workspace.belongsTo(models.User, {
        foreignKey: 'owner_id',
        as: 'owner',
      });
    }
  }

  Workspace.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'owner_id',
      },
    },
    {
      sequelize,
      tableName: 'workspaces',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Workspace;
};
