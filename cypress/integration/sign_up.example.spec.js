/// <reference types="cypress" />

import { faker } from '@faker-js/faker'; //Library for generate data test
const randomName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomEmail = faker.internet.email();
const randomPhoneNumber = faker.phone.phoneNumber('54#########');

describe('Sign-Up page', function() {
    beforeEach(function() {
        cy.visit('/sign-up')
        cy.fixture('signUpPage').then(signUpPage => {
            this.signUpPage = signUpPage;
        })
    })

    it('Validate statics elements', function() {
        cy.url().should('include', 'https').and('include', 'sign-up') //Validate Secure url and sign.up page
        cy.get(this.signUpPage.logotype).should('be.visible').and('have.text', this.signUpPage.textLogotype)
        cy.get(this.signUpPage.requiredField).should('have.text', this.signUpPage.requiredFieldsText)
        cy.get('h2').should('be.visible').and('have.text', this.signUpPage.signUpText)
        cy.get(this.signUpPage.firtsNameLabel).should('have.text', this.signUpPage.TextfirtsNameLabel)
        cy.get(this.signUpPage.inputName).should('have.attr', 'placeholder', this.signUpPage.inputNamePlaceholder)
            .and('be.enabled')
        cy.get(this.signUpPage.lastNameLabel).should('contain.text', this.signUpPage.TextlastNameLabel)
        cy.get(this.signUpPage.inputLastName).should('have.attr', 'placeholder', this.signUpPage.inputLastNamePlaceholder)
            .and('be.enabled')
        cy.get(this.signUpPage.EmailLabel).should('have.text', 'Email *')
        cy.get(this.signUpPage.inputEmail).should('have.attr', 'placeholder', "Enter your email here")
            .and('be.enabled')
        cy.get(this.signUpPage.phoneLabel).should('have.text', 'Phone Number *')
        cy.get(this.signUpPage.dropDownCountry).should('be.disabled')
        cy.contains(this.signUpPage.textHaveAccount).should('be.visible')
        cy.contains(this.signUpPage.textContactSupport)
            .should('be.visible')
        cy.get("a[href='mailto:support@membrane.trade']").should('have.attr', 'href', this.signUpPage.urlMail)
        cy.contains(this.signUpPage.get2fa)
            .should('be.visible')
        cy.get("a[href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2']")
            .should('have.attr', 'href', this.signUpPage.urlGet2fa)

    })

    it('Validate Functionality', function() {
        cy.contains('Next').should('be.disabled') //Validate inactive “Next” button
        const locators = [
            this.signUpPage.inputName,
            this.signUpPage.inputLastName,
            this.signUpPage.inputEmail,
            this.signUpPage.inputNumber
        ]
        locators.forEach(locators => {
            cy.get(locators).click()
            cy.get(".styles_btn-primary__2XfZC").click()

        })
        const messageError = this.signUpPage.messageError
        const errorLocators = [
            "label[for='firstName']:last-of-type",
            "label[for='lastName']:last-of-type",
            "label[for='email']:last-of-type",
            "label[for='number']:last-of-type"
        ]
        errorLocators.forEach(locators => {
            cy.get(locators).should('have.text', messageError)
        })


    })

    it.only('Complete the form with fake data', function() {

        cy.get(this.signUpPage.inputName).type(randomName)
        cy.get(this.signUpPage.inputLastName).type(randomLastName)
        cy.get(this.signUpPage.inputEmail).type(randomEmail)
        cy.get(this.signUpPage.inputNumber).type(randomPhoneNumber)
        cy.get(this.signUpPage.dropDownCountry).click({ force: true })
        cy.contains(this.signUpPage.country["Ar"]).click()
        cy.get(this.signUpPage.submitButton).should('be.enabled').click()


    })
})