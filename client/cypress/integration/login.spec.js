context('Login actions', () => {
	it('It has to login an user', () => {
		cy.loginUser()
	})

	it('It has to login an admin', () => {
		cy.loginAdmin()
	})
})
