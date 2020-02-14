
const routePath = require('path');
const myFile = require('./index.js');

let path = process.argv[2];
path = routePath.resolve(path);
path = routePath.normalize(path);

myFile(path)
.then(path => console.log(path));