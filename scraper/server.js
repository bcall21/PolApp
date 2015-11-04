//Web scraper

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {

    var url = 'http://www.realclearpolitics.com/epolls/latest_polls/president/'

    //request to server for html
    request(url, function(error, response, html) {
        if(!error){
            var $ = cheerio.load(html);

            var results;
            var json = {results : []};

            $('.lp-results').filter(function() {
                var data = $(this);
                results = data.children().first().text();
                json.results = results;

            })
        }

        //write to file
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
    })
})

app.listen('8081')

console.log('Listening on port 8081');

exports = module.exports = app;