import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _employee from  "./employee.js";

export default function initModels(sequelize) {
  const employee = _employee.init(sequelize, DataTypes);

  employee.belongsTo(department, { as: "deptno_department", foreignKey: "deptno"});
  department.hasMany(employee, { as: "employees", foreignKey: "deptno"});

  return {
    employee,
  };
}
