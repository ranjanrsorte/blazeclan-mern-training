function Employee() {
    var Employees = [];

    function getEmployees(startIndex, lastIndex, allEmployeeCount) {
        var employeesList = [];
        Employees = [
            { 'No': '1', 'Name': 'Smith', 'Department': 'Human Resource', 'Salary': '35000', 'Designation': 'Team Lead' },
            { 'No': '2', 'Name': 'Johnson', 'Department': 'Information Technology', 'Salary': '15000', 'Designation': 'Software Developer' },
            { 'No': '3', 'Name': 'Williams', 'Department': 'Accounts', 'Salary': '45000', 'Designation': 'Software Engineer' },
            { 'No': '4', 'Name': 'Jones', 'Department': 'Sales', 'Salary': '15000', 'Designation': 'Software Developer' },
            { 'No': '5', 'Name': 'Brown', 'Department': 'Human Resource', 'Salary': '35000', 'Designation': 'Software Developer' },
            { 'No': '6', 'Name': 'Davis', 'Department': 'Information Technology', 'Salary': '15000', 'Designation': 'Software Engineer' },
            { 'No': '7', 'Name': 'Miller', 'Department': 'Accounts', 'Salary': '45000', 'Designation': 'Software Developer' },
            { 'No': '8', 'Name': 'Wilson', 'Department': 'Sales', 'Salary': '35000', 'Designation': 'Software Developer' },
            { 'No': '9', 'Name': 'Moore', 'Department': 'Human Resource', 'Salary': '15000', 'Designation': 'QA Engineer' },
            { 'No': '10', 'Name': 'Taylor', 'Department': 'Information Technology', 'Salary': '25000', 'Designation': 'Team Lead' },
            { 'No': '11', 'Name': 'Anderson', 'Department': 'Accounts', 'Salary': '40000', 'Designation': 'Manager' },
            { 'No': '12', 'Name': 'Thomas', 'Department': 'Sales', 'Salary': '15000', 'Designation': 'Manager' },
            { 'No': '13', 'Name': 'Jackson', 'Department': 'Marketing', 'Salary': '35000', 'Designation': 'Assistant' },
            { 'No': '14', 'Name': 'White', 'Department': 'Marketing', 'Salary': '30000', 'Designation': 'Assistant' },
            { 'No': '15', 'Name': 'Harris', 'Department': 'Marketing', 'Salary': '123000', 'Designation': 'Software Developer' },
            { 'No': '16', 'Name': 'Martin', 'Department': 'Marketing', 'Salary': '35000', 'Designation': 'Assistant' },
            { 'No': '17', 'Name': 'Thompson', 'Department': 'Marketing', 'Salary': '32000', 'Designation': 'Manager' },
            { 'No': '18', 'Name': 'Garcia', 'Department': 'Marketing', 'Salary': '24000', 'Designation': 'Software Developer' },
            { 'No': '19', 'Name': 'Martinez', 'Department': 'Marketing', 'Salary': '35000', 'Designation': 'Assistant' },
            { 'No': '20', 'Name': 'Robinson', 'Department': 'Marketing', 'Salary': '43000', 'Designation': 'Assistant' },
            { 'No': '21', 'Name': 'Clark', 'Department': 'Accounts', 'Salary': '45000', 'Designation': 'Software Developer' },
            { 'No': '22', 'Name': 'Rodriguez', 'Department': 'Accounts', 'Salary': '45000', 'Designation': 'Engineer' },
            { 'No': '23', 'Name': 'Lewis', 'Department': 'Human Resource', 'Salary': '45500', 'Designation': 'Engineer' },
            { 'No': '24', 'Name': 'Lee', 'Department': 'Information Technology', 'Salary': '32000', 'Designation': 'Team Lead' },
            { 'No': '25', 'Name': 'Walker', 'Department': 'Human Resource', 'Salary': '27000', 'Designation': 'Engineer' },
            { 'No': '26', 'Name': 'Hall', 'Department': 'Information Technology', 'Salary': '33000', 'Designation': 'Software Engineer' },
            { 'No': '27', 'Name': 'Allen', 'Department': 'Accounts', 'Salary': '43000', 'Designation': 'Software Developer' },
            { 'No': '28', 'Name': 'Hernandez', 'Department': 'Human Resource', 'Salary': '45000', 'Designation': 'Engineer' },
            { 'No': '29', 'Name': 'King', 'Department': 'Information Technology', 'Salary': '34000', 'Designation': 'Software Engineer' },
            { 'No': '30', 'Name': 'Wright', 'Department': 'Human Resource', 'Salary': '35000', 'Designation': 'QA Engineer' },
            { 'No': '31', 'Name': 'Lopez', 'Department': 'Accounts', 'Salary': '54000', 'Designation': 'Engineer' },
            { 'No': '32', 'Name': 'Hill', 'Department': 'Accounts', 'Salary': '45000', 'Designation': 'QA Engineer' },
            { 'No': '33', 'Name': 'Scott', 'Department': 'Human Resource', 'Salary': '65000', 'Designation': 'Engineer' },
            { 'No': '34', 'Name': 'Green', 'Department': 'Information Technology', 'Salary': '45000', 'Designation': 'Software Engineer' },
            { 'No': '35', 'Name': 'Adams', 'Department': 'Sales', 'Salary': '13400', 'Designation': 'QA Engineer' },
            { 'No': '36', 'Name': 'Baker', 'Department': 'Accounts', 'Salary': '34000', 'Designation': 'Engineer' },
            { 'No': '37', 'Name': 'Gonzalez', 'Department': 'Sales', 'Salary': '56000', 'Designation': 'Software Developer' },
            { 'No': '38', 'Name': 'Nelson', 'Department': 'Marketing', 'Salary': '35600', 'Designation': 'QA Engineer' },
            { 'No': '39', 'Name': 'Carter', 'Department': 'Marketing', 'Salary': '45000', 'Designation': 'Software Engineer' },
            { 'No': '40', 'Name': 'Mitchell', 'Department': 'Accounts', 'Salary': '35000', 'Designation': 'Team Lead' },
            { 'No': '41', 'Name': 'Mitchell', 'Department': 'Accounts', 'Salary': '35000', 'Designation': 'Team Lead' }
        ];

        if (allEmployeeCount) {
            return Employees.length;
        }

        for (var i = startIndex; i <= lastIndex; i++) {
            employeesList.push(Employees[i]);
        }
        return employeesList;
    }

    function generateTable(dataSource) {

        var columns = Object.keys(dataSource[0]);
        var table = '<table class="table table-bordered table-striped table-dark">';
        var thead = '<thead><tr>';

        for (var i in columns) {
            thead += '<th>' + columns[i] + '</th>';
        }
        thead += '<th></th></tr></thead>';
        table += thead;

        var tbody = "<tbody>";
        for (var r = 0; r < dataSource.length; r++) {

            tbody += '<tr class="table-primary">';
            for (var h = 0; h < columns.length; h++) {
                tbody += '<td>' + dataSource[r][columns[h]] + '</td>';
            }
            tbody += '<td><button id= "' + dataSource[r]['No'] + '"class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themodal">Edit</button></td></tr>';
        }
        tbody += '</tbody>';
        table += tbody;
        table += '</table>';

        return table;
    }

    function generateUpdatedTable(startIndex, lastIndex, updatedEmployees) {
        var updatedEmployeeList = [];
        for (var x = startIndex; x <= lastIndex; x++) {
            updatedEmployeeList.push(updatedEmployees[x]);
        }
        var updatedTbl = generateTable(updatedEmployeeList);
        return updatedTbl;
    }

    this.getTableData = function (startIndex, lastIndex) {
        var employeeList = getEmployees(startIndex, lastIndex, false);
        var tbl = generateTable(employeeList);
        return tbl;
    }

    this.generatePagesNumber = function () {
        var empCount = getEmployees(0, 0, true);
        var pagesCount = parseInt(empCount / 5);
        var ul = '<ul class="pagination justify-content-center flex-wrap">';
        var li = '<li id="lstPrev" class="page-item disabled"><a class="page-link" href="#">Previous</a></li>';
        var unl = ul + li;
        var pages = unl;
        for (var x = 1; x <= pagesCount; x++) {
            pages += '<li id="page_' + x + '" class="page-item" value="' + x + '"><a class="page-link" href="#">' + x + '</a></li>';
        }
        pages += '<li id="lstNxt" class="page-item"><a class="page-link" href="#">Next</a></li></ul>';
        return pages;
    }

    this.getEmployeeCount = function () {
        var employeeCount = getEmployees(0, 0, true);
        return employeeCount;
    }

    this.getEmployeeById = function (value, lastIndex) {
        var emp = getEmployees(value, lastIndex, false);
        return emp;
    }

    this.updateEmployeeById = function (startIndex, lastIndex, updatedEmployee) {
        console.log("Before insert length: " + updatedEmployee[0].No);

        var index = Employees.indexOf(updatedEmployee[0]);
        console.log('index ' + index);
        if (index > -1) {
            Employees.splice(index, 1);
        }
        Employees.push(updatedEmployee[0]);
        Employees = Employees.sort(function (a, b) { return a.No - b.No; });
        console.log(Employees);
        var updatedEmpTable = generateUpdatedTable(startIndex, lastIndex, Employees)
        return updatedEmpTable;
    }
}






