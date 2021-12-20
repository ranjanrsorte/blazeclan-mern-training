import { Sequelize } from "sequelize";
import pkg from "sequelize";

const { DataTypes } = pkg;
const Op = Sequelize.Op;

import employee from './models/employee.js';

const sequelize = new Sequelize("business", "postgres", "mysql", {
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});

sequelize.authenticate().then(
    (authenticate) => {
        console.log(`Connection to database is successful`);
    },
    (error) => {
        console.log(`Error occurred while connecting to database`);
    }
);

class DataAccess {
    constructor() {
        employee.init(sequelize, DataTypes)
    }

    async getEmployee(req, res) {
        await sequelize.sync({ force: false });
        let records = await employee.findAll();
        if (records) {
            return res
                .status(200)
                .send({ message: "Data is received successfully", data: records });
        }
        return res.status(500).send({ message: "Some error Occurred" });
    }

    async addEmployee(req, res) {
        const emp = req.body;
        await sequelize.sync({ force: false });

        const empl = await employee.create(emp);
        if (empl === null) {
            return res
                .status(404)
                .send({ message: `Employee ${emp.empname} cannot be created` });
        }

        return res.status(200).send({
            message: `Employee ${emp.empname} is created successfully`,
        });
    }

    async updateEmployee(req, resp) {
        await sequelize.sync({ force: false });

        let emp = await employee.update(
            {
                empno: req.body.empno,
                empname: req.body.empname,
                designation: req.body.designation,
                salary: req.body.salary,
                deptno: req.body.deptno
            },
            {
                where: {
                    empno: parseInt(req.params.id),
                }
            }
        );
        if (emp) {
            return resp
                .status(200)
                .send({ message: "Data is updated successfully", data: emp });
        }
        return resp
            .status(500)
            .send({ message: "Some error Occurred while updating record" });
    }

    async deleteEmployeeData(req, res) {
        await sequelize.sync({ force: false });
        let dept = await employee.destroy({
            where: {
                empno: parseInt(req.params.id),
            }
        });
        if (dept) {
            return res
                .status(200)
                .send({ message: "Data is deleted successfully", data: dept });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while deleting record" });
    }

    async getSearchedText (req, res) {
        await sequelize.sync({ false: false });
        let searchedText = req.params.searchText;
        console.log(`searchedText ${searchedText}`);
        let record = await employee.findAll({ where: { empname: { [Op.like]: '%' + searchedText + '%' } } });
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