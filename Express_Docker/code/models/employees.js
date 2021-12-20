import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class employees extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    empno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    empname: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deptname: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employees_pkey",
        unique: true,
        fields: [
          { name: "empno" },
        ]
      },
    ]
  });
  return employees;
  }
}
