var source =    ["ENG1002","ENG1002","ENG1003","ENG1005","ENG1060","ENG1090","ENG2005","ECE2072","ECE2111","ECE2191",
                "ECE3091","ECE3121","ECE4032","ECE4042","ECE4043","ECE4053","ECE4076","ECE4087","ECE4094","ECE4095",
                "ECE4122","ECE4808","ECE5882","ECE5884","ECE5886"];

for(i=0;i<source.length;i++) {
    write = "./"+source[i]+"Semester2_2017.csv";
    read = "./"+source[i]+"_Semester2(S2-01)_2017.pdf";
    convert();
}

function convert() {
    let fs = require('fs'),
        PDFParser = require("pdf2json");

    let pdfParser = new PDFParser(this, 1);

    pdfParser.loadPDF(read);

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => fs.writeFile(write, pdfParser.getRawTextContent()));
}