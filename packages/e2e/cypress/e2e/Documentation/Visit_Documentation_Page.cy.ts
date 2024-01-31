export {}

describe('Visit Documentation Page', () => {
  beforeEach(() => {
    cy.task('db:reset')
    cy.visit('http://localhost:3000')
  })

  it('click on documentation Button and look that this is the good page', () => {
    cy.get(
      '[data-testid="HeaderMenu.action.isNavigationDocumentation"]'
    ).click()
    cy.url().should('include', '/documentation')
    cy.get('[class="documentationPage"]').should('be.visible')
  })
})
