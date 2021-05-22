context('Actions', () => {
	before(() => {
		cy.exec('npm run init')
	})
	beforeEach(() => {
		cy.fixture('screenshots.json').as('screenshots')
	})
	it('The user has to buy a product Malbec', () => {
		cy.get('@screenshots').then((screenshots) => {
			cy.loginUser()
			cy.get('#inputSearch').type('malbec')
			cy.contains('.btn', 'Buscar').click()
			cy.wait(500)
			cy.contains('.card-title', 'El enemigo Malbec')
				.should('be.visible')
				.click()
			if (screenshots.take) cy.screenshot('Product-selected')
			cy.get('#addToCart').click()
			if (screenshots.take) cy.screenshot('Client-cart')
			cy.get('#checkout').should('be.visible').click()
			cy.get('#dir').type('My place')
			cy.get('#pm').select('Visa')
			cy.get('#finalizePurchase').click()
		})
	})

	it('The admin has to send the purchase "Compra: 7" to the user', () => {
		cy.get('@screenshots').then((screenshots) => {
			cy.loginAdmin()
			cy.visit('/admin/formPurchase/')
			cy.contains('.btn', 'pagada').click()
			if (screenshots.take) cy.screenshot('Paid-purchases')
			cy.get('#card7').click({ force: true })
			cy.contains('.btn-success', 'Enviar').click()
		})
	})

	it('The admin has to confirm that the purchase "Compra: 7" was delivered', () => {
		cy.get('@screenshots').then((screenshots) => {
			cy.loginAdmin()
			cy.visit('/admin/formPurchase/')
			cy.contains('.btn', 'enviada').click()
			if (screenshots.take) cy.screenshot('Sent-purchases')
			cy.get('#card7').click({ force: true })
			cy.contains('.btn', 'Entregada').click()
		})
	})

	it('The user has review the product', () => {
		cy.get('@screenshots').then((screenshots) => {
			cy.loginUser()
			cy.contains('.nav-link', 'Mis compras').click()
			if (screenshots.take) cy.screenshot('Client-purchases')
			cy.contains('.card-title', 'Compra: 7').click()
			cy.contains('a', 'Review').click()
			cy.get('#rating :nth-child(4)').click()
			cy.get('#review').type('Very nice wine! I recommend it')
			if (screenshots.take) cy.screenshot('Client-review')
			cy.contains('.btn-success', 'Enviar Review').click()
			cy.contains('.card-text', 'Very nice wine! I recommend it')
		})
	})
})
