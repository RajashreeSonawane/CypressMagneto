Cypress.LocalStorage.clear = function (keys, ls, rs) { };
describe('Magneto Software Testing', () => {
  let productTestg
  let data
  let rowsLength
  before(function () {
    cy.task('readXlsx', { file: 'cypress/fixtures/MagnetoExcel.xlsx', sheet: "MagnetoData" }).then((rows) => {
      rowsLength = rows.length;
      cy.writeFile("cypress/fixtures/xlsxData.json", { rows })
    })
    cy.fixture('xlsxData').then((datatest) => {
      data = datatest
    })
    cy.fixture('product').then(function (productTest) {
      productTestg = productTest
    })
    cy.visit(Cypress.env('url'))
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
    for (let i = 0; i < rowsLength; i++) {
      cy.get("#customer-email-fieldset > .required > .control > #customer-email").type(data.rows[i].email);
      cy.get("#customer-email-fieldset > .required > .control > #customer-email").clear()
      cy.wait(10000)
      cy.xpath("//input[@name='firstname']").type(data.rows[i].firstname)
      cy.xpath("//input[@name='firstname']").clear()
      cy.wait(2000)
      cy.xpath("//input[@name='lastname']").type(data.rows[i].lastname)
      cy.xpath("//input[@name='lastname']").clear()
      cy.wait(2000)
      cy.xpath("//input[@name='company']").type(data.rows[i].company)
      cy.xpath("//input[@name='company']").clear()
      cy.wait(2000)
      cy.xpath("//input[@name='street[0]']").type(data.rows[i].street_address)
      cy.xpath("//input[@name='street[0]']").clear()
      cy.wait(2000)
      cy.xpath("//input[@name='city']").type(data.rows[i].city),
      cy.xpath("//input[@name='city']").clear()
      cy.wait(2000)
      cy.xpath("//input[@name='postcode']").type(data.rows[i].postal_code)
      cy.xpath("//input[@name='postcode']").clear()
      cy.wait(5000)
      cy.get('select[name="country_id"]').select('India').should('have.value', 'IN')
      cy.wait(15000)
      cy.get('select[name="region_id"]').select('Andhra Pradesh')
      cy.wait(10000)
      cy.xpath("//input[@name='telephone']").type(data.rows[i].phone)
      cy.xpath("//input[@name='telephone']").clear()
      cy.wait(2000)
      cy.xpath("//*[@id='label_carrier_flatrate_flatrate']").click({ force: true })
      cy.wait(2000)
      cy.get(".button").click()
    }
  })
  it('Verify Order Summary data', function () {
    cy.get('.opc-block-summary')
    cy.wait(5000)
    cy.get('.block > .title').click()
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
