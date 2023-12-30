describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test Name',
      username: 'Test Username',
      password: 'Test Password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.get('input:first').should('exist')
    cy.get('input:last').should('exist')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('Test Username')
      cy.get('input:last').type('Test Password')
      cy.contains('login').click()
      cy.contains('Name logged in')

    })

    it('fails with wrong credentials', function () {
      cy.get('input:first').type('Incorrect Username')
      cy.get('input:last').type('Incorrect Password')
      cy.contains('login').click()
      cy.contains('Invalid credentials')
        .should('have.css', 'color')
        .and('eq', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('Test Username')
      cy.get('input:last').type('Test Password')
      cy.contains('login').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input[placeholder="Title"]').type('Test Title')
      cy.get('input[placeholder="Author"]').type('Test Author')
      cy.get('input[placeholder="Url"]').type('Test Url')
      cy.contains('create').click()
      cy.contains('Test Title')
    })
  })
})