Cypress.LocalStorage.clear = function (keys, ls, rs) { };
describe('Magneto Software Testing', () => {
  let testdatag;
  let productTestg
  before(function () {
    cy.visit(Cypress.env('url'))
    cy.fixture('test_data').then(function (testdata) {
      testdatag = testdata
    })
    cy.fixture('product').then(function (productTest) {
      productTestg = productTest
    })
  })
  it('Choose Product for Magneto', function () {
    cy.get('#ui-id-4 > :nth-child(2)').realHover()
    cy.wait(5000)
    cy.get('#ui-id-9').realHover();
    cy.wait(5000)
    cy.get('#ui-id-13').click({ force: true })
  })
  it('Select Product ', function () {
    cy.get(':nth-child(7) > .product-item-info > .details > .name > .product-item-link').click()
  })
  it('Click on Add to cart button', function () {
    cy.wait(2000)
    cy.get("#option-label-size-143-item-167").click()
    cy.wait(2000)
    cy.get("#option-label-color-93-item-58").click({ force: true })
    cy.wait(2000)
    cy.get("#product-addtocart-button").click({ force: true })
    cy.wait(10000)
    cy.xpath('//a[@class="action showcart"]').click({ force: true })
    cy.xpath('//*[@id="top-cart-btn-checkout"]').realClick()
    cy.wait(15000)
  })
  it('Filling shipping Data', () => {
    cy.log(testdatag.email)
    cy.get("#customer-email-fieldset > .required > .control > #customer-email").type(testdatag.email),
      cy.wait(10000)
    cy.xpath("//input[@name='firstname']").type(testdatag.firstName),
      cy.wait(2000)
    cy.xpath("//input[@name='lastname']").type(testdatag.lastName),
      cy.wait(2000)
    cy.xpath("//input[@name='company']").type(testdatag.company),
      cy.wait(2000)
    cy.xpath("//input[@name='street[0]']").type(testdatag.street_address),
      cy.wait(2000)
    cy.xpath("//input[@name='city']").type(testdatag.city),
      cy.wait(2000)
    cy.xpath("//input[@name='postcode']").type(testdatag.postal_code),
      cy.wait(5000)
    cy.get('select[name="country_id"]').select('India').should('have.value', 'IN')
    cy.wait(15000)
    cy.get('select[name="region_id"]').select('Andhra Pradesh')
    cy.wait(10000)
    cy.xpath("//input[@name='telephone']").type(testdatag.phone),
      cy.wait(2000)
    cy.xpath("//*[@id='label_carrier_flatrate_flatrate']").click({ force: true }),
      cy.wait(2000)
    cy.get(".button").click()
  })
  it('Verify Order Summary data', function () {
    cy.get('.opc-block-summary'),
      cy.wait(5000)
    cy.get('.block > .title').click(),
      cy.wait(5000)
    cy.log(productTestg.Product_name)
    cy.get('.product-item-name')
      .should('contain.text', productTestg.Product_name)
      .should('be.visible')
    cy.wait(5000)
    cy.log(productTestg.Product_quantity)
    cy.get('.details-qty')
      .should('contain.text', productTestg.Product_quantity)
      .should('be.visible')
    cy.wait(5000)
    cy.log(productTestg.Product_price)
    cy.get('.cart-price > .price')
      .should('contain.text', productTestg.Product_price)
      .should('be.visible')
  })
})
