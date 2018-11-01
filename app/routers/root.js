const express = require('express')
var bodyParser = require('body-parser');
const fileLib = require(global.appDir + '/app/helpers/fileLib')

function root(app, io) {
    // static files
    app.use('/pub', express.static(global.appDir + '/app/public'));
    // home page
    const homeRouter = require(global.appDir + '/app/routers/routes/homeRouter');
    app.all('/', homeRouter);
    app.use('/', function(req, res) {
        //console.log(req.originalUrl);
        res.status(404).send('Error 404 <br>Not Found');
        //res.redirect(global.config.siteUrl);
        console.log("ehh you broke it")
    });
}
exports = module.exports = root;