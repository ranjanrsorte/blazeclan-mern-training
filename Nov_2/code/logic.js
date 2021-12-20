function Logic() {

    function getDeps() {
        var departments = ['IT', 'HR', 'SL', 'AC'];
        return departments;
    }

    function getRadioButtons() {
        var data = [{deptType: "company", deptName: "IT"},
            {deptType: "company", deptName: "HR"},
            {deptType: "company", deptName: "SL"},
            {deptType: "company", deptName: "AC"},
            {deptType: "company", deptName: "IT"},
            {deptType: "gender", deptName: "Male"},
            {deptType: "gender", deptName: "Female"}
        ];
        return data;
    }

    function getSubjects() {
        var subjects = ['Maths', 'Chemistry', 'Physics', 'Accounts', 'Networking'];
        return subjects;
    }
    return {
        getDepartments: getDeps,
        getSubjectNames: getSubjects,
        getAllRadioBtns: getRadioButtons
    };
}