import { Sequelize } from "sequelize";
import pkg from "sequelize";
import jsonwebtoken from "jsonwebtoken";

const { DataTypes } = pkg;

import department from "./models/department.js";
import users from "./models/users.js";
import employee from "./models/employee.js";

const sequelize = new Sequelize("business", "postgres", "mysql", {
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});

const jwtSettings = {
    jwtSecret: "msit007700itms",
};

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
        department.init(sequelize, DataTypes);
        users.init(sequelize, DataTypes);
        employee.init(sequelize, DataTypes);
    }

    async authUser(req, res) {
        const user = req.body;
        await sequelize.sync({ force: false });

        const findUser = await users.findOne({
            where: { username: user.username },
        });
        if (findUser === null) {
            return res
                .status(404)
                .send({ message: `User ${user.username} is not found` });
        }

        if (findUser.password.trim() !== user.password.trim()) {
            return res
                .status(401)
                .send({ message: `User ${user.username} password does not match` });
        }

        const token = jsonwebtoken.sign({ user }, jwtSettings.jwtSecret, {
            expiresIn: 3600, // 1 hr
            algorithm: "HS384",
        });

        return res.status(200).send({
            message: `User ${user.username} is authenticated successfully`,
            token: token,
        });
    }

    async addUser(req, res) {
        const user = req.body;
        await sequelize.sync({ force: false });

        const findUser = await users.create(user);
        if (findUser === null) {
            return res
                .status(404)
                .send({ message: `User ${user.username} cannot be created` });
        }

        return res.status(200).send({
            message: `User ${user.username} is created successfully`,
        });
    }

    async getData(req, resp) {
        // 1. establish the connection
        await sequelize.sync({ force: false });
        // 2. read all records
        let records = await department.findAll();
        // 3. send response
        if (records) {
            return resp
                .status(200)
                .send({ message: "Data is received successfully", data: records });
        }
        return resp.status(500).send({ message: "Some error Occurred" });
    }

    async getEmployeesRecord(req, res) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];

            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return res.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }
                    req.decode = decode;

                    await sequelize.sync({ force: false });
                    const emp = await employee.findAll();
                    return res
                        .status(200)
                        .send({ message: `Data Read Successfully`, records: emp });
                }
            );
        } else {
            return res.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }

    async getDepartmentRecords(req, res) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];

            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return res.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }
                    req.decode = decode;

                    await sequelize.sync({ force: false });
                    const dept = await department.findAll();
                    return res
                        .status(200)
                        .send({ message: `Data Read Successfully`, records: dept });
                }
            );
        } else {
            return res.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }

    async updateEmployeeData(req, resp) {
        // 1. establish the connection
        await sequelize.sync({ force: false });
        // 2. update each column based on data received from body
        // update() method uses the where condition to search record and update
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

    async addEmployeeData(req, res) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];

            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return res.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }
                    req.decode = decode;

                    await sequelize.sync({ force: false });
                    const dept = await employee.create(req.body);
                    return res
                        .status(200)
                        .send({ message: `Data Read Successfully`, records: dept });
                }
            );
        } else {
            return res.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }

    async deleteEmployeeData(req, res) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];

            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return res.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }
                    req.decode = decode;

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
            );
        } else {
            return res.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }

    async updateDepartmentData(req, resp) {
        // 1. establish the connection
        await sequelize.sync({ force: false });
        // 2. update each column based on data received from body
        // update() method uses the where condition to search record and update
        let dept = await department.update(
            {
                deptno: req.body.deptno,
                deptname: req.body.deptname,
                location: req.body.location,
                capacity: req.body.capacity
            },
            {
                where: {
                    deptno: parseInt(req.params.id),
                }
            }
        );
        if (dept) {
            return resp
                .status(200)
                .send({ message: "Data is updated successfully", data: dept });
        }
        return resp
            .status(500)
            .send({ message: "Some error Occurred while updating record" });
    }

    async addDepartmentData(req, res) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];

            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return res.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }
                    req.decode = decode;

                    await sequelize.sync({ force: false });
                    const dept = await department.create(req.body);
                    return res
                        .status(200)
                        .send({ message: `Data Read Successfully`, records: dept });
                }
            );
        } else {
            return res.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }

    async deleteDepartmentData(req, res) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];

            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return res.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }
                    req.decode = decode;

                    await sequelize.sync({ force: false });
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
            );
        } else {
            return res.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }
}

export default DataAccess;