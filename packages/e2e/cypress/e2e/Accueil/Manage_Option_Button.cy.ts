export {}
describe('Click on option button', () => {
  beforeEach(() => {
    Cypress.env()
    cy.task('db:reset')
    cy.visit('http://localhost:3000')
  })

  it('click on labeling option button', () => {
    cy.get('[data-testid="Labeling"]').should('not.have.class', 'Joy-checked')
    cy.get('[data-testid="Labeling"]').click()
    cy.get('[data-testid="Labeling"]').should('have.class', 'Joy-checked')
  })

  it('click on realism option button', () => {
    cy.get('[data-testid="Realism"]').should('not.have.class', 'Joy-checked')
    cy.get('[data-testid="Realism"]').click()
    cy.get('[data-testid="Realism"]').should('have.class', 'Joy-checked')
  })

  it('click on noise option button', () => {
    cy.get('[data-testid="Noise"]').should('not.have.class', 'Joy-checked')
    cy.get('[data-testid="Noise"]').click()
    cy.get('[data-testid="Noise"]').should('have.class', 'Joy-checked')
  })

  it('click on disable latitude option button', () => {
    cy.get('[data-testid="Disable latitude"]').should(
      'not.have.class',
      'Joy-checked'
    )
    cy.get('[data-testid="Disable latitude"]').click()
    cy.get('[data-testid="Disable latitude"]').should(
      'have.class',
      'Joy-checked'
    )
  })

  it('click on disable longitude option button', () => {
    cy.get('[data-testid="Disable longitude"]').should(
      'not.have.class',
      'Joy-checked'
    )
    cy.get('[data-testid="Disable longitude"]').click()
    cy.get('[data-testid="Disable longitude"]').should(
      'have.class',
      'Joy-checked'
    )
  })

  it('click on disable altitude option button', () => {
    cy.get('[data-testid="Disable altitude"]').should(
      'not.have.class',
      'Joy-checked'
    )
    cy.get('[data-testid="Disable altitude"]').click()
    cy.get('[data-testid="Disable altitude"]').should(
      'have.class',
      'Joy-checked'
    )
  })
})
