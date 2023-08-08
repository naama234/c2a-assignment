const path = require('path');
const pdf = require('pdf-parse');
const fs = require('fs');

const readPdf = (pathToPdf) => {
    return new Promise((resolve) => {
        const pdfPath = path.resolve(pathToPdf);
        let dataBuffer = fs.readFileSync(pdfPath);
        pdf(dataBuffer).then(function ({ text }) {
            // Remove newlines and other whitespace characters from the text
            const plainText = text.replace(/\s+/g, ' ').trim();
            resolve(plainText);
        });
    });
};

module.exports = {
    readPdf,
};
