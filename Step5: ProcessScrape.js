let fs = require('fs');
let data = [];
let sources = [];
var source = "Unit,Title,Learning Outcome\n";
var count = 1;
var learning = [];
fs.readFile('./sources.csv', 'utf8', function(err,rawsource) {
    sources = rawsource.split(/\r\n|\n/);
    for (i = 1; i < sources.length; i++) {
        let read = "./Handbook/"+sources[i]+".html";
        fs.readFile(read, 'utf8', function(err,rawdata) {
            data = rawdata.split(/\r\n|\n/);

            if (data[12].includes("title")) {
                check = data[12].split(/<title>|\:|\-|<\/title>/);
                unit = check[1];
                title = check[2];
                for(y=0;y<data.length;y++) {
                    if(data[y].includes("ol start='1' type='1'")) {
                        start = y+1;
                        for(z=start;z<data.length;z++) {
                            if(data[z].includes("</ol></p>")) {
                                end = z;
                                for(a=start;a<end;a++) {
                                    data[a] = data[a].replace("<li>","");
                                    capture = data[a].split(/<\/li>/);
                                    if(capture != "<ol start='1' type='1'>") {
                                        learning += capture;
                                    }
                                }
                            }
                        }
                    }
                }
                count = count + 1;
                source += unit + ",";
                source += '"' + title + '"' + ",";
                source += '"' + learning + '"' + "\n"
                learning = [];
            }
            console.log(source);
            fs.writeFileSync("./learning.csv", source, function(err) {
            })
        })
    }
});