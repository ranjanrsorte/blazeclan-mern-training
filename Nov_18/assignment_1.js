//Date: 18-11-2021

const fs = require("fs");
const path = require("path");
let dirPath = path.join(__dirname, './files');

fs.readdir(dirPath, (err, contents) => {
    if (err) {
        console.log(`Error Occured  in reading ${err.message}`);
        return;
    }

    contents.forEach((content, index) => {
        fs.stat(`${dirPath}/${content}`, (error, stat) => {
            if (error) {
                console.log(`Error Occured  while reading ${error.message}`);
                return;
            }

            if (stat.isFile()) {
                console.log(`File Name = ${content}`);
                console.log(`Contents in ${content} is 
                              ${fs.readFileSync(`${dirPath}/${content}`)} `);
            }

            if (stat.isDirectory()) {
                let subDirPath = path.join(dirPath, '/' + content);

                fs.readdir(subDirPath, (error, subDirContents) => {
                    if(error) {
                        console.log(`Error Occured  in reading ${err.message}`);
                        return;
                    }

                    subDirContents.forEach((subDirContent, index) => {
                        fs.stat(`${subDirPath}/${subDirContent}`, (error, stat) => {
                            if (error) {
                                console.log(`Error Occured  while reading ${error.message}`);
                                return;
                            }
                
                            if (stat.isFile()) {
                                console.log(`File Name = ${subDirContent}`);
                                console.log(`Contents in ${subDirContent} is 
                                              ${fs.readFileSync(`${subDirPath}/${subDirContent}`)} `);
                            }
                        });
                    });
                });
            }
        });
    });
});