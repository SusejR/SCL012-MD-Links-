
const routePath = require('path');
const myFile = require('./index.js');
const options = {};

let path = process.argv[2];
path = routePath.resolve(path);
path = routePath.normalize(path);

myFile(path)
    .then(path => {
     //   console.log(path)
    }).catch(error => { console.log(error)});
