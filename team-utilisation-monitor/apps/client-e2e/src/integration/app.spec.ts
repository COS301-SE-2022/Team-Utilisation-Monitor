import { getGreeting } from '../support/app.po';

describe('client', () => {
  beforeEach(() => cy.visit('/'));

  it('default page',()=>{
    cy.visit('/');
    cy.contains("Account Sign In");
  })

  it('should not allow user to login if form is invalid',()=>{
    cy.contains("Account Sign In");
    cy.get('[formControlName="email"]').type('fakeemail@gmail.com'); //false email
    cy.get('#submitLoginFormButton').click({force:true});
    cy.url().should('not.include','AdminTeamProjectView');
  })

  it('should allow the user to go into the create account page',()=>{
    cy.get('#createAccountBtn').click();
    cy.visit('/signup_as_page'); //it acts as an extention off the base URL.
  })

  it('should allow user to sign up as an individual',()=>{
    cy.get('#createAccountBtn').click();
    cy.visit('/signup_as_page'); //it acts as an extention off the base URL.
    cy.visit('/signup_as_individual_page');
    cy.get('[formControlName="Invitecode"]').type('BET165');
    cy.get('[formControlName="firstName"]').type("Steve");
    cy.get('[formControlName="lastName"]').type("Mobs");
    cy.get('[formControlName="email"]').type("mapple@ios.com");
    cy.get('[formControlName="password"]').type("password");
    cy.get('[formControlName="confirmPassword"]').type("password");
    cy.get('button[type="submit"]').visit('/'); //go to root after registering
  })

  it('should allow user to sign up as an admin',()=>{
    cy.get('#createAccountBtn').click();
    cy.visit('/signup_as_page'); //it acts as an extention off the base URL.
    cy.visit('/signup_as_company_page');
    cy.get('[formControlName="companyName"]').type('Berkshire');
    cy.get('[formControlName="firstName"]').type('Warren');
    cy.get('[formControlName="lastName"]').type('Buffet');
    cy.get('[formControlName="email"]').type("coke@gmail.com");
    cy.get('[formControlName="password"]').type("ilovemoney");
    cy.get('[formControlName="confirmPassword"]').type("ilovemoney");
    cy.get('button[type="submit"]').visit('/'); //go to root after registering
    
  })
  
});
