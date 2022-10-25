const express = require('express')
const { resolve } = require('path')

const app = express();

app.use('/', express.static(resolve(__dirname, './app/dist')))
app.use('/*', express.static(resolve(__dirname, './app/dist')))


var port = 3000;
var hostname = '0.0.0.0';

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
