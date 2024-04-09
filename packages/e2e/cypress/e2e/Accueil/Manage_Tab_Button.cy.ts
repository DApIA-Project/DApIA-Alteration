export {}
/*
describe('Click on tab button', () => {
  beforeEach(() => {
    cy.task('db:reset')
    cy.visit('http://localhost:3000')
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[class="view-line"]').should('be.visible')
  })

  it('click on add tab button', () => {
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="DivTab"]').should('have.length', 2)
  })

  it('click on remove tab 2 button', () => {
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="DivTab"]').should('have.length', 2)
    cy.get('[data-testid="RemoveTabButton"]').eq(1).click()
    cy.get('[data-testid="DivTab"]').should('have.length', 1)
  })

  it('click on remove tab 1 button', () => {
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="DivTab"]').should('have.length', 2)
    cy.get('[data-testid="RemoveTabButton"]').eq(0).click()
    cy.get('[data-testid="DivTab"]').should('have.length', 1)
  })

  it('Write scenario in many tab and scenarios are saved', () => {
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="DivTab"]').should('have.length', 3)
    cy.get('[data-testid="DivTab"]').eq(0).click()
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('hide all_planes at 5 seconds')
    cy.get('[data-testid="DivTab"]').eq(2).click()
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('cut all_planes at 5 seconds')
    cy.get('[data-testid="DivTab"]').eq(0).click()
    cy.contains('hide all_planes at 5 seconds').should('be.visible')
    cy.get('[data-testid="DivTab"]').eq(2).click()
    cy.contains('cut all_planes at 5 seconds').should('be.visible')
  })

  it('Write scenario in many tab and delete tab empty and scenarios are saved', () => {
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="DivTab"]').should('have.length', 3)
    cy.get('[data-testid="DivTab"]').eq(0).click()
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('hide all_planes at 5 seconds')
    cy.get('[data-testid="DivTab"]').eq(2).click()
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('cut all_planes at 5 seconds')
    cy.get('[data-testid="DivTab"]').eq(0).click()
    cy.contains('hide all_planes at 5 seconds').should('be.visible')
    cy.get('[data-testid="RemoveTabButton"]').eq(1).click()
    cy.get('[data-testid="DivTab"]').eq(1).click()
    cy.contains('cut all_planes at 5 seconds').should('be.visible')
  })

  it('Write scenario in many tab and delete tab with scenario', () => {
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="DivTab"]').should('have.length', 3)
    cy.get('[data-testid="DivTab"]').eq(0).click()
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('hide all_planes at 5 seconds')
    cy.get('[data-testid="DivTab"]').eq(2).click()
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('cut all_planes at 5 seconds')
    cy.get('[data-testid="DivTab"]').eq(0).click()
    cy.contains('hide all_planes at 5 seconds').should('be.visible')
    cy.get('[data-testid="DivTab"]').eq(2).click()
    cy.contains('cut all_planes at 5 seconds').should('be.visible')
    cy.get('[data-testid="RemoveTabButton"]').eq(2).click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.contains('cut all_planes at 5 seconds').should('not.exist')
  })
})
*/
