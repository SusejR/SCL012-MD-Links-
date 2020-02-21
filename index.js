
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
const chalk = require('chalk');

const filteredLinks = (links) => {
    return links.filter((link) => {
        const prefix = link.href.substring(0, 4);
        if (prefix == 'http') {
            return true;
        } else {
            return false;
        }
    })
}
const file = (path, options) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, data) => {
            if (error) {
                reject(new Error('No existe archivo'));
            }
            let links = [];
            const renderer = new marked.Renderer();

            renderer.link = (href, title, text) => {
            
                links.push({
                    href: href,
                    text: text,
                    file: path,
                });
            };
            marked(data, { renderer: renderer });
            links = filteredLinks(links);
            links = status(links);
            

            
        });
    });
};

const status = (links) => {
    links.filter(link => {
        fetch(link.href)
            .then(response => {
                if (response.status == 200) {
                    console.log(chalk.yellow(link.text) +' ' + chalk.blue(link.href) + ' ' + chalk.green('status ' + response.status));
                } else {
                    console.log(chalk.yellow(link.text) + chalk.blue(link.href) + chalk.red(response.status));
                }
            })
            .catch(error => {
                console.log(chalk.red('Este link no funciona ' + link.href));
            })

    });
};

module.exports = file;

