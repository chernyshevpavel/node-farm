const fs = require('fs');
const http = require("http");
const url = require("url");

const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, {encoding: 'utf8'});
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, {encoding: 'utf8'});
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, {encoding: 'utf8'});
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, {encoding: 'utf8'});
const dataObj = JSON.parse(data);

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////SERVER///////////////////////////////////////////

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // Overvie page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {'content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        res.end(tempOverview.replace('{%PRODUCT_CORDS%}', cardsHtml));
    // Product page
    } else if (pathname === "/product") {
        res.writeHead(200, {'content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    // API
    } else if (pathname === "/api") {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {'content-type': 'text/html'});
        res.end('Not Found page');
    }
});
server.listen(8000, '127.0.0.1', () => {
    console.log('lestening to request port 8000');
});
