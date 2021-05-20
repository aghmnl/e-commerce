context('Actions', () => {
	afterEach(() => {
		// cy.logout()
	})

	xit('The user has to buy a product Malbec', () => {
		cy.loginUser()
		cy.get('#inputSearch').type('malbec')
		cy.contains('.btn', 'Buscar').click()
		cy.contains('.card-title', 'El enemigo Malbec').click()
		cy.get('#addToCart').click()
		cy.get('#checkout').click()
		cy.get('#dir').type('My place')
		cy.get('#pm').select('Visa')
		cy.get('#finalizePurchase').click()
	})

	xit('The admin has to send the product to the user', () => {
		cy.loginAdmin()
		cy.visit('/admin/formPurchase/')
		cy.contains('.btn', 'pagada').click()
		cy.contains('.card-title', 'Compra: 7').click()
		cy.contains('.btn-success', 'Enviar').click()
	})

	xit('The admin has to confirm that the product was delivered', () => {
		cy.loginAdmin()
		cy.visit('/admin/formPurchase/')
		cy.contains('.btn', 'enviada').click()
		cy.contains('.card-title', 'Compra: 7').click()
		cy.contains('.btn', 'Entregada').click()
	})

	it('The user has review the product', () => {
		cy.loginUser()
		cy.contains('.nav-link', 'Mis compras').click()
		cy.contains('.card-title', 'Compra: 7').click()
		cy.contains('a', 'Review').click()
		cy.get('h2 :nth-child(4)').click()
		cy.get('.form-control').type('Very nice wine! I reccomend it')
	})
})
