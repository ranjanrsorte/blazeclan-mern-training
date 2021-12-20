import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    username: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  return users;
  }
}
