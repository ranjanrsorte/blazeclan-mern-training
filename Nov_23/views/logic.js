function getAllEmployeesData(){
    return new Promise((resolve,reject)=>{
        let ajax = new XMLHttpRequest();
    
        ajax.onload = function(){
            resolve(ajax.response); 
        };
    
        ajax.onerror = function(error){
          reject(error);
        };
        
        ajax.open("GET", "http://localhost:7012/api/getEmployees");
        
        ajax.send();
    });  
}

function getAllDepartmentData(){
    return new Promise((resolve,reject)=>{
        let ajax = new XMLHttpRequest();
    
        ajax.onload = function(){
            resolve(ajax.response); 
        };
    
        ajax.onerror = function(error){
          reject(error);
        };
        
        ajax.open("GET", "http://localhost:7012/api/getDepartments");
        
        ajax.send();
    });  
}

function getSearchedTextEmployeeDataOr(searchedText) {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.onload = function() {
            resolve(ajax.response);
        }
        ajax.onerror = function(error){
            reject(error);
        }
        ajax.open("GET", "http://localhost:7012/api/getSearchedTextEmployees/or/" + searchedText);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();
    });
}

function getSearchedTextEmployeeDataAnd(searchedText) {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.onload = function() {
            resolve(ajax.response);
        }
        ajax.onerror = function(error){
            reject(error);
        }
        ajax.open("GET", "http://localhost:7012/api/getSearchedTextEmployees/and/" + searchedText);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();
    });
}

function getSearchedTextEmployeeDataIn(searchedText) {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.onload = function() {
            resolve(ajax.response);
        }
        ajax.onerror = function(error){
            reject(error);
        }
        ajax.open("GET", "http://localhost:7012/api/getSearchedTextEmployees/in/" + searchedText);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();
    });
}

function getSearchedTextEmployeeDataSalary (searchedText) {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.onload = function() {
            resolve(ajax.response);
        }
        ajax.onerror = function(error){
            reject(error);
        }
        ajax.open("GET", "http://localhost:7012/api/getSearchedTextEmployees/salary/" + searchedText);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();
    });
}

function getEmployeesByDepartment (deptname) {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.onload = function() {
            resolve(ajax.response);
        }
        ajax.onerror = function(error){
            reject(error);
        }
        ajax.open("GET", "http://localhost:7012/api/getEmployeesByDepartment/" + deptname);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();
    });
}