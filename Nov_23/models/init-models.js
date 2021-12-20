import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _employees from  "./employees.js";

export default function initModels(sequelize) {
  const employees = _employees.init(sequelize, DataTypes);


  return {
    employees,
  };
}
