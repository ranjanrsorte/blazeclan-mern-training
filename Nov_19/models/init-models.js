import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _category from  "./category.js";
import _department from  "./department.js";
import _employee from  "./employee.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const category = _category.init(sequelize, DataTypes);
  const department = _department.init(sequelize, DataTypes);
  const employee = _employee.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  employee.belongsTo(department, { as: "deptno_department", foreignKey: "deptno"});
  department.hasMany(employee, { as: "employees", foreignKey: "deptno"});

  return {
    category,
    department,
    employee,
    users,
  };
}
