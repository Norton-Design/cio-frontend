describe('edit customer', () => {
    it('user can edit customer attributes', ()=>{
        // This test was designed with the messages.2.data input 
        // In a live setting, I would simulate persisted data all
        // the way from the customer creation page, to guarantee 
        // this test is truly repeatable, and not reliant arbitary input

        // Hit next 25 results
        cy.visit('http://127.0.0.1:3000/customers');
        cy.findByRole('link', {  name: /next 25/i}).click()

        // Find customer and grab "last updated" text
        cy.findByRole('link', {  name: /clareritchie@keeling\.io/i}).click()

        // Click Edit Attributes button
        cy.findByRole('link', {  name: /edit attributes/i}).click()

        // Add attributes
        cy.findByPlaceholderText(/name/i).type('test name #1')
        cy.findByPlaceholderText(/value/i).type('test value #1')
        cy.findByRole('button', {  name: /add/i}).click()

        cy.findByPlaceholderText(/name/i).type('test name #2')
        cy.findByPlaceholderText(/value/i).type('test value #2')
        cy.findByRole('button', {  name: /add/i}).click()

        cy.findByPlaceholderText(/name/i).type('test name #3')
        cy.findByPlaceholderText(/value/i).type('test value #3')
        cy.findByRole('button', {  name: /add/i}).click()

        // Verify added attributes
        cy.findByText(/test name #1/i).should('be.visible')
        cy.get('[data-test="test value #1"]').should('have.value', 'test value #1')
        cy.findByText(/test name #2/i).should('be.visible')
        cy.get('[data-test="test value #2"]').should('have.value', 'test value #2')
        cy.findByText(/test name #3/i).should('be.visible')
        cy.get('[data-test="test value #3"]').should('have.value', 'test value #3')

        // Submit attribute changes
        cy.findByRole('button', {  name: /save changes/i}).click()

        // Delete attributes
        cy.url().should('eq', 'http://127.0.0.1:3000/customers/35')
        cy.findByRole('link', {  name: /edit attributes/i}).click()
        cy.get('[data-test="remove-test name #1"]').click()
        cy.get('[data-test="remove-test name #2"]').click()
        cy.get('[data-test="remove-test name #3"]').click()

        cy.findByText(/test name #1/i).should('not.exist')
        cy.get('[data-test="test value #1"]').should('not.exist')
        cy.findByText(/test name #2/i).should('not.exist')
        cy.get('[data-test="test value #2"]').should('not.exist')
        cy.findByText(/test name #3/i).should('not.exist')
        cy.get('[data-test="test value #3"]').should('not.exist')

        cy.findByRole('button', {  name: /save changes/i}).click()
        
        // Verify deleted attributes
        cy.findByRole('cell', {  name: /test name #1/i}).should('not.exist')
        cy.findByRole('cell', {  name: /test name #2/i}).should('not.exist')
        cy.findByRole('cell', {  name: /test name #3/i}).should('not.exist')

        // Change existing attributes
        cy.findByRole('link', {  name: /edit attributes/i}).click()
        cy.get('[data-test="Rubieton"]').clear().type('New York')
        cy.findByRole('button', {  name: /save changes/i}).click()
        cy.findByRole('cell', {  name: /New York/i})

        cy.findByRole('link', {  name: /edit attributes/i}).click()
        cy.get('[data-test="New York"]').clear().type('Rubieton')
        cy.findByRole('button', {  name: /save changes/i}).click()

        // Clear changes works
        cy.findByRole('link', {  name: /edit attributes/i}).click()
        cy.get('[data-test="remove-aston martinrosemarie"]').click()
        cy.get('[data-test="Rubieton"]').clear().type('last test value')
        cy.get('.justify-end > .underline').click()
        cy.get('[data-test="Rubieton"]').should('have.value', "Rubieton")
        cy.get('[data-test="remove-aston martinrosemarie"]').should('exist')
    })
})