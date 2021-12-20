import { Sequelize } from "sequelize";
import pkg from "sequelize";
const { DataTypes } = pkg;
const Op = Sequelize.Op;
const or = Sequelize.or;
const and = Sequelize.and;

import employees from "./../models/employees.js";
import department from "./../models/department.js";

const sequelize = new Sequelize("business", "postgres", "mysql", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
});

sequelize.authenticate().then(
    (authenticate) => {
        console.log("Database Connection is Successful");
    },
    (error) => {
        console.log("Error occurred while connecting to database");
    }
);

class DataAccess {
    constructor() {
        employees.init(sequelize, DataTypes);
        department.init(sequelize, DataTypes);
    }

    async getEmployeesData(req, resp) {
        await sequelize.sync({ force: false });
        let records = await employees.findAll();
        if (records) {
            return resp
                .status(200)
                .send({ message: "Data is received successfully", data: records });
        }
        return resp.status(500).send({ message: "Some error Occurred" });
    }

    async getDepartmentsData(req, resp) {
        await sequelize.sync({ force: false });
        let records = await department.findAll();
        if (records) {
            return resp
                .status(200)
                .send({ message: "Data is received successfully", data: records });
        }
        return resp.status(500).send({ message: "Some error Occurred" });
    }

    async getEmployeesDataBySearchedTextOr(req, res) {
        await sequelize.sync({ force: false });
        let searchedText = req.params.text;
        let record = await employees.findAll({
            where: or({
                empname: { [Op.like]: '%' + searchedText + '%' }
            },
                {
                    deptname: { [Op.like]: '%' + searchedText + '%' }
                }
            )
        });

        if (record) {
            return res
                .status(200)
                .send({ message: "Data is updated successfully", data: record });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while updating record" });

    }

    async getEmployeesDataBySearchedTextAnd(req, res) {
        await sequelize.sync({ force: false });
        let searchedText = req.params.text;
        let record = await employees.findAll({
            where: and({
                empname: { [Op.like]: '%' + searchedText + '%' },
                deptname: { [Op.like]: '%' + searchedText + '%' },
            })
        });

        if (record) {
            return res
                .status(200)
                .send({ message: "Data is updated successfully", data: record });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while updating record" });

    }

    async getEmployeesDataBySearchedTextIn(req, res) {
        await sequelize.sync({ force: false });
        let searchedText = req.params.text;
        let record = await employees.findAll({
            where: and({
                deptname: ['IT', 'HR', 'TR']
            }, or({
                empname: { [Op.like]: '%' + searchedText + '%' }
            },
                {
                    deptname: { [Op.like]: '%' + searchedText + '%' }
                }
            )
            )
        });

        if (record) {
            return res
                .status(200)
                .send({ message: "Data is updated successfully", data: record });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while updating record" });

    }

    async getEmployeesDataBySearchedTextSalary(req, res) {
        await sequelize.sync({ force: false });
        let searchedText = req.params.text;
        let record = await employees.findAll({
            where: and({
                salary: { [Op.gt]: 10000 },
                salary: { [Op.lt]: 60000}
            }, or({
                empname: { [Op.like]: '%' + searchedText + '%' }
            },
                {
                    deptname: { [Op.like]: '%' + searchedText + '%' }
                }
            )
            )
        });

        if (record) {
            return res
                .status(200)
                .send({ message: "Data is updated successfully", data: record });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while updating record" });

    }

    async getEmployeesByDepartment(req, res) {
        await sequelize.sync({ force: false });
        let deptname = req.params.deptname;
        let record = await employees.findAll({
            where: {
                deptname : deptname
            }
        });

        if (record) {
            return res
                .status(200)
                .send({ message: "Data is updated successfully", data: record });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while updating record" });

    }
}

export default DataAccess;