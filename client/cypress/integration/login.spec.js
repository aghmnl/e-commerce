context('Actions', () => {
	beforeEach(() => {
		cy.fixture('users.json').as('usersData') // Para usar los datos definidos en users.json y darle un alias
	})

	it('It has to login an user', () => {
		cy.get('@usersData').then((usersData) => {
			cy.loginUser(usersData.user.email, usersData.user.password)
			cy.get('.close').click()
		})
	})

	it('It has to add a product to the cart', () => {})
})
