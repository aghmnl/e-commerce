context('Actions', () => {
	beforeEach(() => {
		cy.fixture('users.json').as('usersData') // Para usar los datos definidos en users.json y darle un alias
	})

	it('It has to login an user', () => {
		cy.get('@usersData').then((usersData) => {
			cy.visit('/')

			cy.get('.close').click()
			cy.loginUser(usersData.user.email, usersData.user.password)

			cy.contains('.navbar-brand', usersData.user.name).should('be.visible')
		})
	})

	it('It has to add find product Malbec', () => {
		cy.get('#inputSearch').type('malbec')
		cy.contains('.btn', 'Buscar').click()
		cy.contains('.card-title', 'El enemigo Malbec').click()
		cy.get('#addToCart').click()
		cy.get('#checkout').click()
		cy.get('#dir').type('My place')
		cy.get('#pm').click()
		cy.wait(2000)
	})
})
