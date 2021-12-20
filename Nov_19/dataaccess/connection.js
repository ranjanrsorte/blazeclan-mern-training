/* Connection to Database */

import { Sequelize } from "sequelize";
import pkg from "sequelize";

const { DataTypes } = pkg;
const Op = Sequelize.Op;

import department from "./../models/department.js";
import employee from "./../models/employee.js";

const sequelize = new Sequelize("business", "postgres", "mysql", {
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});

sequelize.authenticate().then(
    (authenticate) => {
        console.log("Connection to database successfully");
    },
    (error) => {
        console.log("Error occured while connection to database");
    }
);

class DataAccess {
    constructor() {
        department.init(sequelize, DataTypes);
        employee.init(sequelize, DataTypes);
    }

    async getData(req, res) {
        await sequelize.sync({ false: false });
        let records = await department.findAll();
        if (records) {
            return res
                .status(200)
                .send({ message: "Data is received successfully", data: records });
        }
        return res.status(500).send({ message: "Some error Occurred" });
    }

    async getEmployeesData(req, res) {
        await sequelize.sync({ false: false });
        let records = await employee.findAll();
        if (records) {
            return res
                .status(200)
                .send({ message: "Data is received successfully", data: records });
        }
        return res.status(500).send({ message: "Some error Occurred" });
    }

    async postData(req, res) {
        await sequelize.sync({ false: false });
        let dept = await department.create(req.body);
        if (dept) {
            return res
                .status(200)
                .send({ message: "Data is added successfully", data: dept });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while adding record" });
    }

    async postEmployeeData(req, res) {
        await sequelize.sync({ false: false });
        let emp = await employee.create(req.body);
        if (emp) {
            return res
                .status(200)
                .send({ message: "Data is added successfully", data: emp });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while adding record" });
    }

    async putData(req, res) {
        // 1. establish the connection
        await sequelize.sync({ false: false });
        // 2. update each column based on data received from body
        // update() method uses the where condition to search record and update
        let dept = await department.update(
            {
                deptno: req.body.deptno,
                deptname: req.body.deptname,
                location: req.body.location,
                capacity: req.body.capacity,
            },
            {
                where: {
                    deptno: parseInt(req.params.id),
                }
            }
        );
        if (dept) {
            return res
                .status(200)
                .send({ message: "Data is updated successfully", data: dept });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while updating record" });
    }

    async putEmployeeData(req, res) {
        // 1. establish the connection
        await sequelize.sync({ false: false });
        // 2. update each column based on data received from body
        // update() method uses the where condition to search record and update
        let emp = await employee.update(
            {
                empno: req.body.empno,
                empname: req.body.empname,
                designation: req.body.designation,
                salary: req.body.salary,
                deptno: req.body.deptno,
            },
            {
                where: {
                    empno: parseInt(req.params.id),
                }
            }
        );
        if (emp) {
            return res
                .status(200)
                .send({ message: "Data is updated successfully", data: emp });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while updating record" });
    }

    async deleteData(req, res) {
        // 1. establish the connection
        await sequelize.sync({ false: false });
        // 2. update each column based on data received from body
        // update() method uses the where condition to search record and update
        let dept = await department.destroy({
            where: {
                deptno: parseInt(req.params.id),
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

    async deleteEmployeeData(req, res) {
        // 1. establish the connection
        await sequelize.sync({ false: false });
        // 2. update each column based on data received from body
        // update() method uses the where condition to search record and update
        let emp = await employee.destroy({
            where: {
                empno: parseInt(req.params.id),
            }
        });
        if (emp) {
            return res
                .status(200)
                .send({ message: "Data is deleted successfully", data: emp });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while deleting record" });
    }

    async searchText(req, res) {
        await sequelize.sync({ false: false });
        let searchedText = req.params.text;
        console.log(`searchedText ${searchedText}`);
        let record = await department.findAll({ where: { deptname: { [Op.like]: '%' + searchedText + '%' } } });
        console.log(`record ${record}`);
        if (record) {
            return res
                .status(200)
                .send({ message: "Data is updated successfully", data: record });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while updating record" });
    }

    async searchEmployeeText(req, res) {
        await sequelize.sync({ false: false });
        let searchedText = req.params.text;
        if (searchedText === null || searchedText === "" || searchedText.length === 0) {
            let records = await employee.findAll();
            if (records) {
                return res
                    .status(200)
                    .send({ message: "Data is received successfully", data: records });
            }
            return res.status(500).send({ message: "Some error Occurred" });

        } else {
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
}

export default DataAccess;