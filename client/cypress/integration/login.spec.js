context('Actions', () => {
	beforeEach(() => {
		cy.fixture('users.json').as('usersData') // Para usar los datos definidos en users.json y darle un alias
	})

	xit('It has to login an user', () => {
		cy.loginUser()
	})

	it('It has to login an admin', () => {
		cy.loginAdmin()
	})

	xit('It has to buy a product Malbec', () => {
		cy.loginUser()
		cy.get('#inputSearch').type('malbec')
		cy.contains('.btn', 'Buscar').click()
		cy.contains('.card-title', 'El enemigo Malbec').click()
		cy.get('#addToCart').click()
		cy.get('#checkout').click()
		cy.get('#dir').type('My place')
		cy.get('#pm').select('Visa').debug()
		cy.get('#finalizePurchase').click()
	})

	it('It has to buy filter all red wines that are "Cabernet Sauvignon"', () => {})
})
