import { useState } from 'react';
import DropdownComponent from '../reusablecomponents/dropdowncomponent';
import DataGridComponent from '../reusablecomponents/datagridcomponent';
const EmployeeFormComponent = () => {
    const [employee, setEmployee] = useState({ empno: 0, empname: '', designation: '', salary: '', deptname: '' });
    const [employees, addEmployee] = useState([]);
    const [designations, setDesig] = useState(['Manager', 'Clerk', 'Operator', 'Engineer']);
    const [departments, setDepts] = useState(['IT', 'HR', 'TR', 'SL', 'AC']);
    const [canSort, setSort] = useState(false);
    const [canGroup, setGroup] = useState(false);

    // clear all HTML Editable elements
    const clear = () => {
        setEmployee({ empno: 0, empname: '', designation: '', salary: '', deptname: '' });
    };

    const sortByEmpname = () => {
        if (canSort) {
            setSort(false);
        }
        else {
            setSort(true);
        }
    }

    const groupByDepartment = () => {
        setGroup(true);
    }

    const save = () => {
        // mutate the employees array by adding new employee in employees
        addEmployee([...employees, employee]);
    }

    const deleteEmployee = (row) => {
        var index = employees.indexOf(row);
        if (index > -1) {
            employees.splice(index, 1);
        }
        setEmployee({ ...employees, employees });
    }

    const getSelectedDesignation = (value) => {
        setEmployee({ ...employee, designation: value });
    };

    const getSelectedDeptName = (value) => {
        setEmployee({ ...employee, deptname: value });
    };

    return (
        <div className="container">
            <form name="frmEmp">
                {/* Since input and select elements are bound with JSON object  properties
               the 'onChange' event will update tyhe property of object and hence the same object 
               has be updated*
               {...employee, empno: parseInt(evt.target.value)}
                The above expression means the old state of employee will be mutated (updated) only for 
                empno based on value entered into the input element
                The same 'employee' object will be mutated (updated) for onChange event of the HTMl elements
              */}
                <div className="form-group">
                    <label>EmpNo</label>
                    <input type="text" value={employee.empno} className="form-control"
                        onChange={(evt) => { setEmployee({ ...employee, empno: parseInt(evt.target.value) }) }} />
                </div>
                <div className="form-group">
                    <label>EmpName</label>
                    <input type="text" value={employee.empname} className="form-control"
                        onChange={(evt) => { setEmployee({ ...employee, empname: evt.target.value }) }} />
                </div>
                <div className="form-group">
                    <label>Designation</label>
                    {/* <select  value={employee.designation} className="form-control"
                   onChange={(evt)=>{setEmployee({...employee, designation: evt.target.value})}}
                  >
                      {
                          designations.map((ds,idx)=>(
                              <option key={idx} value={ds}>{ds}</option>
                          ))
                      }
                  </select> */}
                    <DropdownComponent dataSource={designations}
                        valueProperty={employee.designation}
                        getSelectedValue={getSelectedDesignation}
                    ></DropdownComponent>
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input type="text" value={employee.salary} className="form-control"
                        onChange={(evt) => { setEmployee({ ...employee, salary: parseInt(evt.target.value) }) }}
                    />
                </div>
                <div className="form-group">
                    <label>Department Name</label>
                    {/* <select  value={employee.deptname} className="form-control"
                  onChange={(evt)=>{setEmployee({...employee, deptname: evt.target.value})}}
                  >
                      {
                          departments.map((dp,idx)=>(
                              <option key={idx} value={dp}>{dp}</option>
                          ))
                      }
                  </select> */}
                    <DropdownComponent dataSource={departments}
                        valueProperty={employee.deptname}
                        getSelectedValue={getSelectedDeptName}
                    ></DropdownComponent>
                </div>
                <div className="btn-group-sm">
                    <input type="button" value="New" className="btn btn-primary formBtn"
                        onClick={clear} />
                    <input type="button" value="Save" className="btn btn-success formBtn"
                        onClick={save} />
                    <input type="button" value="Sort By Empname" className="btn btn-danger formBtn"
                        onClick={sortByEmpname} />
                    <input type="button" value="Group By Department" className="btn btn-warning formBtn"
                        onClick={groupByDepartment} />
                </div>
            </form>
            <hr />

            <DataGridComponent
                dataSource={employees}
                getSelectedRow={setEmployee}
                canDelete={true}
                deleteSelectedRecord={deleteEmployee}
                canSort={canSort}
                sortKey={'empname'}
                canGroup={canGroup}
                groupKey={'deptname'}
                deptDataSource={departments}
                pageSize={5}></DataGridComponent>
        </div>
    );
};

export default EmployeeFormComponent;