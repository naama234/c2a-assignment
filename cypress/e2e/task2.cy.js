const path = require('path');

describe('Compare PDF Files Test', () => {
  it('should assert true if the texts of two PDF files are the same', () => {
    const pdf1Path = path.join('cypress', 'fixtures', 'pdfs', 'dummy.pdf');
    const pdf2Path = path.join('cypress', 'fixtures', 'pdfs' ,'dummy2.pdf');

    cy.task('readPdf', pdf1Path).then((pdf1Text) => {
      // Read the text from the second PDF file
      cy.task('readPdf', pdf2Path).then((pdf2Text) => {
        // Compare the texts of the two PDF files
        expect(pdf1Text).to.equal(pdf2Text);
      });
    });
  });
});
