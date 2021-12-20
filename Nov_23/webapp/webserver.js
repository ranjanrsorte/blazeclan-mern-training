import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 7011;

const instance = express();

let __dirName = fileURLToPath(import.meta.url);

instance.use(
    express.static(path.join(__dirName, './../../node_modules/bootstrap/dist/css'))
);

instance.use(
    express.static(path.join(__dirName, './../../views'))
); 

let router = express.Router();
instance.use(router);

router.get('/', (req,resp)=>{
    // response the index.html file
    resp.sendFile('employee.html', {
        root: path.join(__dirName, './../../views')
    });
});

instance.listen(port, ()=>{
    console.log(`Server Started on Port ${port}`);
});