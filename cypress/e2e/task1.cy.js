function logIn (username, password) {
  cy.get('a#login2').click();
  cy.get('input#loginusername')
      .invoke('val', username)
      .trigger('input');
  cy.get('input#loginpassword')
      .invoke('val', password)
      .trigger('input');
}
function makeSureTheItemInCart(itemName) {
  cy.contains('Cart').click();
  cy.get('tbody#tbodyid').contains(itemName).should('exist');
}

describe('DemoBlaze Test', () => {
  it('should add the cheapest phone to cart', () => {
    cy.visit('https://www.demoblaze.com/');
    logIn('automatedUser26@example.com', '4r4nd0mp4ssw0rd');
    cy.get('button.btn.btn-primary[onclick="logIn()"]').click();
    cy.get('a#itemc[onclick="byCat(\'phone\')"]').click();
    let cheapestPrice = Number.MAX_VALUE;
    let cheapestPhone;

    cy.get('.card').each((phone) => {
      const priceText = phone.find('h5').text();
      const price = Number(priceText.replace('$', ''));

      if (price < cheapestPrice) {
        cheapestPrice = price;
        cheapestPhone = phone;
      }
    }).then(() => {

      const cheapestPhoneTitle = cheapestPhone.find('h4 a').text();
      const cheapestPhonePriceText = cheapestPhone.find('h5').text();
      const cheapestPhonePrice = Number(cheapestPhonePriceText.replace('$', ''));

      cy.log(`Cheapest Phone: ${cheapestPhoneTitle}`);
      cy.log(`Cheapest Price: $${cheapestPhonePrice}`);
      cy.contains(cheapestPhoneTitle).click();
      cy.contains('Add to cart').click();
      makeSureTheItemInCart(cheapestPhoneTitle)
    });
  });
});
