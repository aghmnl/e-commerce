context('Actions', () => {
	afterEach(() => {
		// cy.logout()
	})

	it('The user has to buy a product Malbec', () => {
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

	it('The admin has to send the product to the user', () => {
		cy.loginAdmin()
		cy.visit('/admin/formPurchase/')
		cy.contains('.btn', 'pagada').click()
		cy.contains('.card-title', 'Compra: 7').click()
		cy.contains('.btn-success', 'Enviar').click()
	})

	it('The admin has to confirm that the product was delivered', () => {
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
		cy.get(':nth-child(2) > .form-control').type(
			'Very nice wine! I recommend it'
		)
		cy.contains('.btn-success', 'Enviar Review').click()
		cy.get(
			':nth-child(5) > .content-review > .card-body > .card-text'
		).contains('Very nice wine! I recommend it')
	})
})