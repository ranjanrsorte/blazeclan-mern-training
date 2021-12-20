import express from "express";
import cors from "cors";
import DataAccess from "./dataaccess.js";

const instance = express();
instance.use(express.json());
instance.use(express.urlencoded({ extended: false }));
instance.use(cors({
    origin:'*',
    methods:'*',
    allowedHeaders:'*'
}));

const port = process.env.PORT || 7011;
const dataAccess = new DataAccess();

instance.post("/api/auth/authUser", dataAccess.authUser);
instance.post("/api/auth/adduser", dataAccess.addUser);

instance.get("/api/getdepartment", dataAccess.getDepartmentRecords);
instance.put("/api/department/:id",dataAccess.updateDepartmentData);
instance.post("/api/add/department",dataAccess.addDepartmentData);
instance.delete("/api/delete/department/:id",dataAccess.deleteDepartmentData);

instance.get("/api/getemployees", dataAccess.getEmployeesRecord);
instance.put("/api/employee/:id",dataAccess.updateEmployeeData);
instance.post("/api/add/employee",dataAccess.addEmployeeData);
instance.delete("/api/delete/employee/:id",dataAccess.deleteEmployeeData);

instance.listen(port, () => {
    console.log(`Server started on port ${port}`);
});