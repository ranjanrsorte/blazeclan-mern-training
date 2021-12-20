import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class usersinrole extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    relationid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    rolename: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'roles',
        key: 'rolename'
      }
    }
  }, {
    sequelize,
    tableName: 'usersinrole',
    schema: 'public',
    timestamps: false
  });
  return usersinrole;
  }
}
