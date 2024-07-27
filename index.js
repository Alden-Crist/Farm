// const fs = require('fs');
// const http = require('http');
// const url = require('url');
// const slugify = require('slugify');
// const replaceTemplate = require('./modules/replaceTemplate');
// /////////////////////////////////////////////
// //Files

// // Blocking ,synchronous way
// // const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// // console.log(textIn);

// // const textOut = `This is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
// // fs.writeFileSync("./starter/txt/output.txt", textOut);
// // console.log("File written");

// // Non-Blocking, asynchronous way
// // fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
// //   if (err) return console.log("Error");
// //   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
// //     console.log(data2);
// //     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
// //       console.log(data3);
// //       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
// //         console.log("Your file has been ready");
// //       });
// //     });
// //   });
// // });

// // console.log("Will read file");

// /////////////////////////////////////////////
// //SERVER
// const tempOverview = fs.readFileSync(
//   `${__dirname}/templates/template-overview.html`,
//   'utf-8'
// );
// //SERVER

// const tempCard = fs.readFileSync(
//   `${__dirname}/templates/template-card.html`,
//   'utf-8'
// );
// //SERVER
// const tempProduct = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   'utf-8'
// );
// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataObject = JSON.parse(data);

// const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));

// console.log(slugs);

// const server = http.createServer((req, res) => {
//   // console.log(req);
//   // console.log(req.url);
//   // res.end("Hello from the server!");
//   // console.log(req.url);
//   // console.log(url.parse(req.url, true));
//   const myURL = new URL(`http://127.0.0.1:8000${req.url}`);
//   const { searchParams, pathname: pathName } = myURL;

//   //Overview page
//   if (pathName === '/' || pathName === '/overview') {
//     res.writeHead(200, {
//       'content-type': 'text/html',
//     });
//     const cardsHtml = dataObject
//       .map((el) => replaceTemplate(tempCard, el))
//       .join('');
//     const output = tempOverview.replace('{%PRODUCT_CARDS%', cardsHtml);

//     res.end(output);

//     //Product page
//   } else if (pathName === '/product') {
//     console.log(searchParams);
//     res.writeHead(200, { 'Content-type': 'text/html' });
//     const product = dataObject.find((el) => el.id == searchParams.get('id'));
//     output = replaceTemplate(tempProduct, product);
//     res.end(output);
//     //api
//   } else if (pathName === '/api') {
//     res.writeHead(200, {
//       'content-type': 'application/json',
//     });
//     res.end(data);
//     //not found
//   } else {
//     res.writeHead(404, {
//       'Content-type': 'text/html',
//       'my-own-header': 'hello-world',
//     });
//     res.end('<h1>Page could not be found</h1>');
//   }
// });

// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to requests on port 8000');
// });

const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
require('dotenv').config(); // Load environment variables

/////////////////////////////////////////////
// Files

// Blocking, synchronous way
// const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./starter/txt/output.txt", textOut);
// console.log("File written");

// Non-Blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been ready");
//       });
//     });
//   });
// });

// console.log("Will read file");

/////////////////////////////////////////////
// SERVER
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
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  const myURL = new URL(`${req.protocol}://${req.headers.host}${req.url}`);
  const { searchParams, pathname: pathName } = myURL;

  // Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%', cardsHtml);

    res.end(output);

  // Product page
  } else if (pathName === '/product') {
    console.log(searchParams);
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObject.find((el) => el.id == searchParams.get('id'));
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

  // API
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    res.end(data);

  // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page could not be found</h1>');
  }
});

const PORT =  8000;
const HOST =  '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Listening to requests on ${HOST}:${PORT}`);
});
