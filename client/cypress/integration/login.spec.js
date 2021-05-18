context('Actions', () => {
	it('Debe loguear un usuario', () => {
		cy.visit('/login')
		cy.get('#emailLogin').type('aghmnl@gmail.com')
		cy.get('#passwordLogin').type('1234')
		cy.get('#iniciarSesion').click()
		cy.wait(1000)
		cy.get('.close').click()
	})
})
