// import http module
const http = require('http');
const path = require('path');
const url = require('url');

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain'});

//   res.end('Hello World!\n');
// });

const router = (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const pathname = parsedURL.pathname;

  //different path names
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
  } else if (pathname ==='/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('About us\n');
  } else if (pathname ==='/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('Contact us\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain'});
    res.end('Page not found\n');
  }
};

const server = http.createServer((req, res) => {
  router(req, res);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Hosting on Port: ${port}`);
});

server.on('error', (error) => {
  console.error(`Server error: ${error}`);
})