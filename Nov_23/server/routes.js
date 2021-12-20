import express from 'express';
import cors from 'cors';
import DataAccess from './dataaccess.js';

const instance = express();

instance.use(express.json());
instance.use(express.urlencoded({ extended: false }));

instance.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*'
}));

const port = process.env.PORT || 7012;
const dataAccessLayer = new DataAccess();

instance.get("/api/getEmployees", dataAccessLayer.getEmployeesData);
instance.get("/api/getDepartments", dataAccessLayer.getDepartmentsData);
instance.get("/api/getSearchedTextEmployees/or/:text", dataAccessLayer.getEmployeesDataBySearchedTextOr);
instance.get("/api/getSearchedTextEmployees/and/:text", dataAccessLayer.getEmployeesDataBySearchedTextAnd);
instance.get("/api/getSearchedTextEmployees/in/:text", dataAccessLayer.getEmployeesDataBySearchedTextIn);
instance.get("/api/getSearchedTextEmployees/salary/:text", dataAccessLayer.getEmployeesDataBySearchedTextSalary);
instance.get("/api/getEmployeesByDepartment/:deptname", dataAccessLayer.getEmployeesByDepartment);

instance.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});
