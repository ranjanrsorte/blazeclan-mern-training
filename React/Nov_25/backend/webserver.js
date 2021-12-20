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

instance.get("/api/getemployee", dataAccess.getEmployee);
instance.post("/api/add/employee", dataAccess.addEmployee);
instance.put("/api/update/employee/:id", dataAccess.updateEmployee);
instance.delete("/api/delete/employee/:id",dataAccess.deleteEmployeeData);
instance.get("/api/search/getemployee/:searchText", dataAccess.getSearchedText);

instance.listen(port, () => {
    console.log(`Server started on port ${port}`);
});