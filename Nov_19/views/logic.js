function getData(){     
    return new Promise((resolve,reject)=>{
        let ajax = new XMLHttpRequest();
    
        ajax.onload = function(){
            resolve(ajax.response); 
        };
    
        ajax.onerror = function(error){
          reject(error);
        };
        
        ajax.open("GET", "http://localhost:7013/api/departments");
        ajax.send();
    });  
} 

function postData(emp){
    return new Promise((resolve,reject)=>{
        let ajax = new XMLHttpRequest();
    
        ajax.onload = function(){
            resolve(ajax.response); 
        };
    
        ajax.onerror = function(error){
          reject(e);
        };
    
        ajax.open("POST","http://localhost:7013/api/employees");
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(emp));
    });  
}

function putData(id,product){
    ajax.open("PUT", `http://localhost:7013/api/employees/${id}`);
}

function deleteData(id){
    ajax.open("DELETE", `http://localhost:7013/api/employees/${id}`);
}