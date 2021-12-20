import express from "express";
import cors from "cors";
import AuthLogic from "./dataaccess.js";

const instance = express();

instance.use(express.json());
instance.use(express.urlencoded({ extended: false }));

instance.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}));

const port = process.env.PORT || 7014;
const dataAccessLayer = new AuthLogic();

instance.post("/api/assignRole", dataAccessLayer.assignRoleToUser);
instance.post("/api/addUser", dataAccessLayer.addUser);
instance.post("/api/authuser",dataAccessLayer.authUser);
instance.get("/api/department", dataAccessLayer.getDepartmentData);
instance.post("/api/addDepartment", dataAccessLayer.addDepartment);
instance.put("/api/updateDepartment/:id", dataAccessLayer.updateDepartmentData);
instance.delete("/api/deleteDepartment/:id", dataAccessLayer.deleteDepartmentData);

instance.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Only for creating test cases with mocha
export default instance;