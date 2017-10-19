let fs = require('fs');
let request = require('request');
let data = [];
fs.readFile('./sources.csv', 'utf8', function(err,rawdata) {
    data = rawdata.split(/\r\n/);
    for (i = 1; i < data.length; i++) {
        let read = "https://www.monash.edu.au/pubs/handbooks/units/"+data[i]+".html";
        let write = "./Handbook/"+data[i]+".html";
        Scrape(read,write);
    }
});

function Scrape(read,write) {
    request(read, function (error, response, html) {
        fs.writeFileSync(write, html, function(err) {
        })
    });
}