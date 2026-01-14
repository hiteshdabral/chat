const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // associations go here
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(225),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      // Define a separate scope to explicitly include the password when needed (e.g., for login validation)
      scopes: {
        withPassword: {
          attributes: {
            include: ['password'],
          },
        },
      },
      hooks: {
        beforeValidate: async (user, options) => {
          if (user.changed('email') && user.email) {
            user.email = user.email.toLowerCase();
          }
        },
        beforeSave: async (user, options) => {
          // Hash password
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(5);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  User.prototype.comparePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  };

  return User;
};
