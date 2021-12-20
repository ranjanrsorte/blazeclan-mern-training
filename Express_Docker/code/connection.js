/* Connection to Database */

let employees = [
    { EmpNo: 101, EmpName: "Mahesh", DeptName: "IT", Salary: 11000 },
    { EmpNo: 102, EmpName: "Tejas", DeptName: "HR", Salary: 12000 },
    { EmpNo: 103, EmpName: "Leena", DeptName: "IT", Salary: 13000 },
    { EmpNo: 104, EmpName: "Neeta", DeptName: "HR", Salary: 14000 },
    { EmpNo: 105, EmpName: "Vandana", DeptName: "IT", Salary: 15000 },
];

let department = [
    { deptno: 1, deptname: "IT", location: "Pune", capacity: 350 },
    { deptno: 2, deptname: "HR", location: "Mumbai", capacity: 100 },
    { deptno: 3, deptname: "SL", location: "Delhi", capacity: 250 },
    { deptno: 4, deptname: "AC", location: "Hyderabad", capacity: 35 }
]

class DataAccess {

    async getData(req, res) {
        return res
            .status(200)
            .send({ message: "Data is received successfully", data: JSON.stringify(department) });

    }

    async getEmployeesData(req, res) {
        return res
            .status(200)
            .send({ message: "Data is received successfully", data: JSON.stringify(employees) });
    }

    async postData(req, res) {
        let dept = req.body;
        if (dept) {
            department.push(dept);
            return res
                .status(200)
                .send({ message: "Data is added successfully", data: department });
        }
    }

    async postEmployeeData(req, res) {
        let emp = req.body;
        if (emp) {
            employees.push(emp);
            return res
                .status(200)
                .send({ message: "Data is added successfully", data: employees });
        }
    }

    async putData(req, res) {
        let dept = req.body;
        var index = department.indexOf(dept);
        if (index > -1) {
            department.slice(index, 1);
        }
        department.push(dept);
        department = department.sort(function (a, b) { return a.deptno > b.deptno; });
        return res
            .status(200)
            .send({ message: "Data is updated successfully", data: department });

    }

    async putEmployeeData(req, res) {
        let emp = req.body;
        var index = employees.indexOf(emp);
        if (index > -1) {
            employees.slice(index, 1);
        }
        employees.push(emp);
        employees = employees.sort(function (a, b) { return a.EmpNo > b.EmpNo; });
        return res
            .status(200)
            .send({ message: "Data is updated successfully", data: employees });
    }

    async deleteData(req, res) {
        let deptno = req.params.id;
        for (let i = 0; i < department.length; i++) {
            if (department[i].deptno === deptno) {
                department.slice(i, 1);
            }
        }
        return res.status(200).send({ message: "Data Deleted Successfully ", data: department });

    }

    async deleteEmployeeData(req, res) {
        let empno = req.params.id;
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].EmpNo === empno) {
                employees.slice(i, 1);
            }
        }
        return res.status(200).send({ message: "Data Deleted Successfully ", data: employees });
    }

    /*async searchText(req, res) {
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
    }*/
}

export default DataAccess;