/// <reference types="cypress" />

describe('API validation', function () {

    it("Request with INVALID data", function () {
      cy.request('POST', '/sign-in', {email: 'panatester@gmail.com', password: '123456'})
      .its('status')
      .should('eq', 200)
   
     })

     it("Headers validate", function () {
      const item = {email: 'panatester@gmail.com', password: '123456'}
      cy.request('POST', 'https://api-staging.membrane.trade/v2/login', item).then((response)=>{
        expect(response.status).eq(200);
        expect(response.body).to.have.property('statusCode', 401);
        expect(response.body.error).to.have.property('code', 401 );
        expect(response.body.error).to.have.property('message',"Wrong email or password, try again.")
      })
           

    })

})