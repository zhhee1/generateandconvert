let fs = require('fs')
let PDFParser = require("pdf2json");

let source = ["ENG1001", "ENG1002", "ENG1003", "ENG1005", "ENG1060", "ENG1090",
    "ENG2005", "ENG2801", "ECE2072", "ECE2111", "ECE2191", "ECE3051", "ECE3062",
    "ECE3091", "ECE3121", "ECE4032", "ECE4042", "ECE4043", "ECE4053", "ECE4076",
    "ECE4087", "ECE4094", "ECE4095", "ECE4122","MEC2407", "MEC3458", "MTH1030", "TRC3600"];

for (i = 0; i < source.length; i++) {
    let read = "./PDF/"+source[i]+"_Semester2(S2-01)_2017.pdf";
    let write = "./csv/"+source[i]+"Semester2_2017.csv";
    convert(read, write);
}

function convert(read, write) {
    let pdfParser = new PDFParser(this, 1);
    pdfParser.loadPDF(read);
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => fs.writeFileSync(write, pdfParser.getRawTextContent()));
}