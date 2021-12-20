const fs = require("fs");
const path = require("path");
const http = require("http");
const serverPath = path.join(__dirname, "./../views");
var employees = [];

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === '/app') {
        fs.readFile(`${serverPath}/app.html`, { encoding: "ascii" }, (error, file) => {
            if (error) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.write(`File Not Found ${error.message}`);
                res.end();
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            // the response will be HTML Stream from the home.html
            res.write(file);
            res.end();
        }
        );
    }

    if (req.url === '/app/post') {
        if (req.method === "POST") {
            let receivedData;
            req.on('data', (chunk) => {
                receivedData = JSON.parse(chunk);
            });
            // once the data read is complete start processing it
            req.on('end', () => {
                console.log(JSON.stringify(receivedData));
                employees.push(receivedData);
                // send response back
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(employees));
                res.end();
            });
        }
    }

    if (req.url === '/app/getemployees') {
        if (req.method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(employees));
            res.end();
        }
    }

    if (req.method === "PUT") {
        let receivedData;
        req.on('data', (chunk) => {
            receivedData = JSON.parse(chunk);
        });
        // once the data read is complete start processing it
        req.on('end', () => {
            let url = req.url;
            let index = url.lastIndexOf('/');
            let empId = url.slice(index + 1);
            if (receivedData.empNo === empId) {
                for (let i = 0; i < employees.length; i++) {
                    if (employees[i].empNo === empId) {
                        employees.splice(i, 1);
                    }
                }
                employees.push(receivedData);
                employees = employees.sort(function (a, b) { return a.empNo - b.empNo; });
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(employees));
            res.end();
        });
    }

    if (req.method === "DELETE") {
        let receivedData;
        req.on('data', (chunk) => {
            receivedData = JSON.parse(chunk);
        });
        // once the data read is complete start processing it
        req.on('end', () => {
            let url = req.url;
            let index = url.lastIndexOf('/');
            let empId = url.slice(index + 1);
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].empNo === empId) {
                    employees.splice(i, 1);
                }
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(employees));
            res.end();
        });
    }
});

server.listen(9090);
console.log("Started on port 9090");