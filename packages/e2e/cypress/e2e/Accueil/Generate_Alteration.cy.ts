export {}
describe('Generate a complete alteration', () => {
  beforeEach(() => {
    cy.task('db:reset')
    cy.visit('http://localhost:3000')
    cy.get('[data-testid="AddTabButton"]').click()
  })

  it('Generate an alteration without option', () => {
    cy.get('[class="view-line"]').type('hide all_planes at 5 seconds')
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.get('[class="imageDownload"]', { timeout: 20000 }).should(
      ($elements) => {
        expect($elements).to.have.length(1)
      }
    )
  })

  it('Generate an alteration with option', () => {
    cy.get('[class="view-line"]').type('hide all_planes at 5 seconds')
    cy.get('[data-testid="Labeling"]').click()
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.get('[class="imageDownload"]', { timeout: 20000 }).should(
      ($elements) => {
        expect($elements).to.have.length(1)
      }
    )
  })

  it('Generate an alteration with variable', () => {
    cy.get('[class="view-line"]').type(
      'let $var = {{}1,7{}}, hide all_planes at $var seconds\n'
    )
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.get('[class="imageDownload"]', { timeout: 20000 }).should(
      ($elements) => {
        expect($elements).to.have.length(2)
      }
    )
  })

  it('Generate an alteration in tab 6', () => {
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[data-testid="AddTabButton"]').click()
    cy.get('[class="view-line"]').type('hide all_planes at 5 seconds')
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.get('[class="imageDownload"]', { timeout: 20000 }).should(
      ($elements) => {
        expect($elements).to.have.length(1)
      }
    )
  })

  it("Don't generate alteration because error in scenario", () => {
    cy.get('[class="view-line"]').type('hide all_planes at 5 second')
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get('[class="imageDownload"]').should('not.exist')
    cy.get('[data-testid="GenerateAlterationButton"]').click()
    cy.get('[data-testid="ScenarioOutput.action.displayError"]', {
      timeout: 20000,
    })
      .should('exist')
      .should('be.visible')
    cy.get('[class="imageDownload"]').should('not.exist')
  })
})
