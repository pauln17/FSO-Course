describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({
      name: 'Test Name',
      username: 'Test Username',
      password: 'Test Password'
    })
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
      cy.login({
        username: 'Test Username',
        password: 'Test Password'
      })

      cy.createBlog({
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test Url'
      })
    })

    it('A blog can be created', function () {
      cy.contains('Title: Test Title')
    })

    it('A blog can be liked', function () {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted by its creator', function () {
      cy.contains('remove').click()
      cy.should('not.contain', 'Title: Test Title')
    })

    it('A blog can not be deleted by non-creator', function () {
      cy.contains('button', 'remove')
      cy.contains('logout').click()

      cy.createUser({
        name: 'Test Name2',
        username: 'Test Username2',
        password: 'Test Password2'
      })

      cy.login({
        username: 'Test Username2',
        password: 'Test Password2'
      })

      cy.contains('button', 'remove').should('not.exist')
    })

    it('Blog list is ordered by amount of likes (descending)', function () {
      cy.createBlog({
        title: 'Blog with most likes',
        author: 'Test Author',
        url: 'Test Url',
        likes: 54
      })

      cy.createBlog({
        title: 'Blog with second most likes',
        author: 'Test Author',
        url: 'Test Url',
        likes: 23
      })

      cy.createBlog({
        title: 'Blog with third most likes',
        author: 'Test Author',
        url: 'Test Url',
        likes: 11
      })

      cy.get('.blog').eq(0).contains('Blog with most likes')
      cy.get('.blog').eq(1).contains('Blog with second most likes')
      cy.get('.blog').eq(2).contains('Blog with third most likes')
    })
  })
})
