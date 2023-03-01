describe('Magneto Software Testing', () => {
    let rowsLength
    before(() => {
        cy.task('readXlsx', { file: 'cypress/fixtures/logindata.xlsx', sheet: "MagnetoData" }).then((rows) => {
            rowsLength = rows.length;
            cy.writeFile("cypress/fixtures/excelData.json", { rows })
        })
        cy.visit('https://classic.crmpro.com/')
    })
    it('data driven ', () => {
        cy.wait(15000)
        cy.fixture('xlsxData').then((datatest) => {
            for (let i = 0; i < rowsLength; i++) {
                cy.get('input[name="username"]').type(datatest.rows[i].username);
                cy.wait(3000)
                cy.get('input[name="password"]').type(datatest.rows[i].password);
                cy.wait(3000)
                cy.get('input[value="Login"]').click();
            }
        })
    })
})