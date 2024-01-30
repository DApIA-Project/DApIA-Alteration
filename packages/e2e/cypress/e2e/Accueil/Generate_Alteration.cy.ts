export {}
describe('Generate a complete alteration', () => {
  beforeEach(() => {
    Cypress.env()
    cy.task('db:reset')
    cy.visit('http://localhost:3000')
    cy.wait(1000)
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[class="alterationeditor"]').click()
  })

  it('Generate an alteration without option', () => {
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('hide all_planes at 5 seconds')
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.get('[class="imageDownload"]').should(($elements) => {
      expect($elements).to.have.length(1)
    })
  })

  it('Generate an alteration with option', () => {
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('hide all_planes at 5 seconds')
    cy.get('[data-testid="Labeling"]').click()
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.get('[class="imageDownload"]').should(($elements) => {
      expect($elements).to.have.length(1)
    })
  })

  it('Generate an alteration with variable', () => {
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type(
      'let $var = {{}1,7{}}, hide all_planes at $var seconds\n'
    )
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.wait(2000)
    cy.get('[class="imageDownload"]').should(($elements) => {
      expect($elements).to.have.length(2)
    })
  })

  it('Generate an alteration in tab 6', () => {
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('hide all_planes at 5 seconds')
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.get('[class="imageDownload"]').should(($elements) => {
      expect($elements).to.have.length(1)
    })
  })

  it("Don't generate alteration because error in scenario", () => {
    cy.get('[class="alterationeditor"]').click()
    cy.get('[class="alterationeditor"]').type('hide all_planes at 5 second')
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="ScenarioOutput.action.displayError"]').should(
      'be.visible'
    )
  })
})
