describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'rommel',
      username: 'rommel',
      password: 'codingisfun'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#Username').type('rommel')
      cy.get('#Password').type('codingisfun')
      cy.get('#login-button').click()

      cy.get('.success')
        .should('contain', 'Welcome rommel')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('contain', 'Logged in as rommel')
    })

    it('login fails with wrong password', function() {
      cy.get('#Username').type('rommel')
      cy.get('#Password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Logged in as rommel')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'rommel', password: 'codingisfun' })
    })

    it('a new blog can be created', function() {
      cy.createBlog({
        title: 'testing blog',
        author: 'rommel',
        url: 'testblog.com',
      })
      cy.contains('testing blog')
    })

    it('a new blog can be created and can like it after', function() {
      cy.createBlog({
        title: 'testing blog',
        author: 'rommel',
        url: 'testblog.com',
      })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1 Likes')
    })

    it.only('a blog can be deleted by the owner', function() {
      cy.createBlog({
        title: 'testing blog',
        author: 'rommel',
        url: 'testblog.com',
      })
      cy.contains('view').click()
      cy.contains('delete').click()

      cy.get('html').should('contain', 'was deleted')
    })

    it.only('blogs are ordered based on likes', function() {
      cy.createBlog({
        title: 'first',
        author: 'rommel',
        url: 'testblog1.com',
        likes: 6,
      })
      cy.createBlog({
        title: 'second',
        author: 'rommel',
        url: 'testblog2.com',
        likes: 5
      })

      cy.get('.defaultView').then($elements => {
        let strings = $elements.map(($i, $el) => $el)
        cy.wrap(strings).should('equal', strings.sort())
      })
    })
  })
})