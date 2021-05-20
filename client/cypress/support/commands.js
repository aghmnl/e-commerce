// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
	cy.visit('/login')
	cy.get('#emailLogin').type(email)
	cy.get('#passwordLogin').type(password)
	cy.get('#iniciarSesion').click()
})

Cypress.Commands.add('loginUser', () => {
	cy.fixture('users.json').as('usersData') // Para usar los datos definidos en users.json y darle un alias
	cy.get('@usersData').then((usersData) => {
		cy.login(usersData.user.email, usersData.user.password)
		cy.get('.close').click()
		cy.contains('.navbar-brand', usersData.user.name).should('be.visible')
	})
})

Cypress.Commands.add('loginAdmin', () => {
	cy.fixture('users.json').as('usersData') // Para usar los datos definidos en users.json y darle un alias
	cy.get('@usersData').then((usersData) => {
		cy.login(usersData.admin.email, usersData.admin.password)
		cy.get('.close').click()
		cy.contains('.navbar-brand', usersData.admin.name).should('be.visible')
	})
})

Cypress.Commands.add('logout', () => {
	cy.visit('/settings')
	cy.get('.btn > svg').click()
})
