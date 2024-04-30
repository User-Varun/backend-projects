const fs = require('fs');
const http = require('http');
const url = require('url');
const queryString = require('querystring');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate.js');

let = urlQuery = 'id=0';

let parsedObj = queryString.parse(urlQuery);

console.log('parsed query :', parsedObj);

/////////////////////////////////////// FILES

// 1. Blocking , syncronous way

// Reading from the file
// const textin = fs.readFileSync("./txt/input.txt", "utf-8");

// console.log(textin);

// // Writing to A new File & logging a message
// const textOut = `this is what we know about avocade : ${textin}, \nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File written");

// 2. Non-blocking , asyncrous way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("💥");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(`./txt/$.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file has been written");
//       });
//     });
//   });
// });

/////////////////////////////////////// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//  ***************** my code ***********************
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
const updatedDataObj = dataObj.map((obj, i) => ({ ...obj, slug: slugs[i] }));
//  ***************** my code ***********************

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  console.log(url.parse(req.url, true));

  // overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });

    const productHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, productHtml);

    res.end(output);
  }
  // product page
  else if (pathname === '/product') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });

    const product = updatedDataObj[query.id];

    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  // API page
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });

    res.end(data);
  }
  // NOT FOUND
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });

    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000');
});
