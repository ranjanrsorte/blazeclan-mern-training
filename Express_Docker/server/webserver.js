import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 7011;

const instance = express();

let __dirName = fileURLToPath(import.meta.url);
console.log(`__dirName ${path.join(__dirName, './../../node_modules/bootstrap/dist/css')}`);
instance.use(
    express.static(path.join(__dirName, './../../node_modules/bootstrap/dist/css'))
);

instance.use(
    express.static(path.join(__dirName, './../../node_modules/jquery/dist'))
);

instance.use(
    express.static(path.join(__dirName, './../views'))
);

let router = express.Router();

instance.use(router);

router.get('/api', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirName, './../views')
    });
});

router.get('/api/employee', (req, res) => {
    res.sendFile('employee.html', {
        root: path.join(__dirName, './../views')
    });
});

router.get('/api/department', (req, res) => {
    res.sendFile('department.html', {
        root: path.join(__dirName, './../views')
    });
});

instance.listen(port, ()=>{
    console.log(`Server Started on Port ${port}`);
});