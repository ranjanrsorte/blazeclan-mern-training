import express from "express";
import cors from "cors";
import DataAccess from "../dataaccess/connection.js";

const instance = express();

instance.use(express.json());
instance.use(express.urlencoded({ extended: false }));

instance.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}));

const port = process.env.PORT || 7013;
const dataAccess = new DataAccess();

instance.get("/api/departments", dataAccess.getData);
instance.post("/api/add/departments", dataAccess.postData);
instance.put("/api/update/departments/:id", dataAccess.putData);
instance.delete("/api/delete/departments/:id", dataAccess.deleteData);
instance.get("/api/getSearchedText/:text", dataAccess.searchText);

instance.get("/api/employees", dataAccess.getEmployeesData);
instance.post("/api/add/employee", dataAccess.postEmployeeData);
instance.put("/api/update/employee/:id", dataAccess.putEmployeeData);
instance.delete("/api/delete/employee/:id", dataAccess.deleteEmployeeData);
instance.get("/api/employee/getSearchedText/:text", dataAccess.searchEmployeeText);

instance.listen(port, () => {
    console.log(`Server started successfully on Port ${port}`);
});