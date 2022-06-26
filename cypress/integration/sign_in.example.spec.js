/// <reference types="cypress" />

describe('Validate Sign in site Membrane', function () {

    beforeEach(function () {
        cy.visit("/sign-in")
        cy.fixture('credentials').then(credentials => {
            this.credentials = credentials;
        })
    })

    it('Validate static elements', function () {
        cy.url().should('include', 'https') //Validate Secure url
        cy.get('.styles_appTitle__qn1G-').should('be.visible').and('have.text', 'Membrane')
        cy.get('h2').should('be.visible').and('have.text', ' Sign In')
        cy.get("label[for='email']").should('be.visible').and('have.text', 'Email')
        cy.get("label[for='password']").should('be.visible').and('have.text', 'Password')
        cy.get('.svg-inline--fa').should('be.visible')
        cy.contains('Sign Up').should('be.visible')
        cy.contains('Forgot Password').should('be.visible')

    })

    it('Validate Functionality', function () {
        cy.get("button[type='submit']").should('not.be.disabled').click()
        const locators =
        [
            "label[class='styles_label__1pzAT styles_labelError__3hvbE'][for='email']",
            "label[class='styles_label__1pzAT styles_labelError__3hvbE'][for='password']"
        ]
        locators.forEach(locators =>{
            cy.get(locators).should('have.text', 'This field is required')
        })
        cy.get("input[placeholder='Enter your email']").type(this.credentials.incorrectEmail)
        cy.get("label[class='styles_label__1pzAT styles_labelError__3hvbE'][for='email']")
        .should('have.text', 'Invalid email format')
        cy.get("input[placeholder='Enter your email']").type(this.credentials.correctEmail)
        cy.get("input[placeholder='Insert your password']").type(this.credentials.correctPassword)
        cy.get('.styles_btn-primary__2XfZC > button').should('not.be.disabled').click()
        cy.get('.styles_alert__-D2Fi').should('have.text', 'Wrong email or password, try again.')

    })

})