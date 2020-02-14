// module.exports = () => {
//   // ...
// };
const fs = require('fs');
const file = (path => {
    let promise = new Promise ((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, data) => {
            if(error){
                reject(new Error('No existe archivo'));
            };
            resolve(data);
        });
    });
return promise
});
module.exports = file;
