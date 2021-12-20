import { Sequelize } from "sequelize";
import pkg from "sequelize";
import jsonwebtoken from "jsonwebtoken";

const { DataTypes } = pkg;

import department from "./models/department.js";
import users from "./models/users.js";
import usersinrole from "./models/usersinrole.js";

const sequelize = new Sequelize("business", "postgres", "mysql", {
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});

const jwtSettings = {
    jwtSecret: "aaaaa"
}

class AuthLogic {
    constructor() {
        department.init(sequelize, DataTypes);
        users.init(sequelize, DataTypes);
        usersinrole.init(sequelize, DataTypes);
    }

    async assignRoleToUser(req, res) {
        const requestBody = req.body;
        console.log(`${requestBody}`);
        await sequelize.sync({ force: false });

        const userCreated = await usersinrole.create({
            relationid: requestBody.relationid,
            username: requestBody.username,
            rolename: requestBody.rolename,
        });
        return res
            .status(201)
            .send({ message: `User for Role ${requestBody.rolename} is registered successfully` });
    }

    async addUser(req, res) {
        const user = req.body;
        await sequelize.sync({ force: false });
        let email = user.username;
        if (email.indexOf('@') === -1) {
            return res
                .status(401)
                .send({ message: `${email} is not a valid email address` });
        }

        const findUser = await users.findOne({
            where: { username: user.username },
        });

        if (findUser != null) {
            return res
                .status(401)
                .send({ message: `User ${user.username} is already exists` });
        }
        console.log(`Password length ${user.password.trim().length}`);

        if (user.password.trim().length < 6 || user.password.trim().length > 16) {
            return res
                .status(401)
                .send({ message: `Password must contains 6 to 16 characters` });
        }
        
        let usr = await users.create(req.body);
        if (usr) {
            return res
            .status(200)
            .send({ message: `User ${user.username} added successfully` });
        }
        return res
            .status(500)
            .send({ message: "Some error Occurred while adding user" });

    }

    async authUser(req, resp) {

        const user = req.body;
        await sequelize.sync({ force: false });

        const findUser = await users.findOne({
            where: { username: user.username },
        });

        if (findUser === null) {
            return resp
                .status(404)
                .send({ message: `User ${user.username} is not found` });
        }

        if (findUser.password.trim() !== user.password.trim()) {
            return resp
                .status(401)
                .send({ message: `User ${user.username} password does not match` });
        }

        const findUserRole = await usersinrole.findOne({
            where: { username: user.username }
        });

        if (findUserRole === null) {
            return resp.status(404).send({ message: `Role for User ${user.username} is not found` });
        }

        let tokenDataJson = { "username": user.username, "rolename": findUserRole.rolename };

        const token = jsonwebtoken.sign({ tokenDataJson }, jwtSettings.jwtSecret, {
            expiresIn: 3600, // 1 hr
            algorithm: "HS384",
        });

        return resp.status(200).send({
            message: `User ${user.username} is authenticated successfully`,
            token: token,
            username: user.username,
            rolename: findUserRole.rolename,
            statusCode: 200
        });
    }

    async getDepartmentData(req, resp) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];
            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return resp.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }

                    req.decode = decode;
                    await sequelize.sync({ force: false });
                    const dept = await department.findAll();
                    return resp
                        .status(200)
                        .send({ message: `Data Read Successfully`, records: dept });
                }
            );
        } else {
            return resp.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }

    async addDepartment(req, resp) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];
            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return resp.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }

                    await sequelize.sync({ force: false });
                    let dept = await department.create(req.body);
                    if (dept) {
                        return resp
                            .status(200)
                            .send({ message: "Data is added successfully", data: dept });
                    }
                    return resp
                        .status(500)
                        .send({ message: "Some error Occurred while adding record" });
                }
            );
        } else {
            return resp.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }

    async updateDepartmentData(req, resp) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];
            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return resp.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }

                    await sequelize.sync({ force: false });
                    let checkRole = decode.tokenDataJson.rolename;
                    if (checkRole === "Administrator" || checkRole === "Manager") {
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
                            return resp
                                .status(200)
                                .send({ message: "Data is updated successfully", data: dept });
                        }
                        return resp
                            .status(500)
                            .send({ message: "Some error Occurred while updating record" });
                    } else {
                        return resp.status(403).send({ message: "Access Denied" });
                    }
                }
            );
        } else {
            return resp.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }

    async deleteDepartmentData(req, resp) {
        if (req.headers.authorization !== undefined) {
            const receivedToken = req.headers.authorization.split(" ")[1];
            await jsonwebtoken.verify(
                receivedToken,
                jwtSettings.jwtSecret,
                async (error, decode) => {
                    if (error) {
                        return resp.status(401).send({
                            message: `User Authentication Failed because token verification filed`,
                        });
                    }

                    await sequelize.sync({ force: false });
                    let checkRole = decode.tokenDataJson.rolename;
                    if (checkRole === "Administrator") {
                        let dept = await department.destroy({
                            where: {
                                deptno: parseInt(req.params.id),
                            }
                        });
                        if (dept) {
                            return resp
                                .status(200)
                                .send({ message: "Data is deleted successfully", data: dept });
                        }
                        return resp
                            .status(500)
                            .send({ message: "Some error Occurred while deleting record" });
                    } else {
                        return resp.status(403).send({ message: "Access Denied" });
                    }
                }
            );
        } else {
            return resp.status(401).send({
                message: `User Authentication Failed because no Authorization Header is present in request`,
            });
        }
    }
}

export default AuthLogic;