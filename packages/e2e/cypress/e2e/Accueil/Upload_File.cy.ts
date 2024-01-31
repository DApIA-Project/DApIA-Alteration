export {}
describe('Upload a file to alterate', () => {
  beforeEach(() => {
    cy.task('db:reset')
    cy.visit('http://localhost:3000')
  })

  it('click and upload file', () => {
    cy.get(
      '[data-testid="RecordInputFiles.action.isNotSelectedRecording"]'
    ).should(($elements) => {
      expect($elements).to.have.length(2)
    })
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get(
      '[data-testid="RecordInputFiles.action.isNotSelectedRecording"]'
    ).should(($elements) => {
      expect($elements).to.have.length(1)
    })
    cy.get(
      '[data-testid="RecordInputFiles.action.isSelectedRecording"]'
    ).should('be.visible')
  })

  it('click and upload replay file', () => {
    cy.get(
      '[data-testid="RecordInputFiles.action.isNotSelectedRecording"]'
    ).should(($elements) => {
      expect($elements).to.have.length(2)
    })
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecording"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get(
      '[data-testid="RecordInputFiles.action.selectRecordingReplay"]'
    ).selectFile('cypress/resources/2022_07_toulouse_SAMUCF_1h.sbs')
    cy.get(
      '[data-testid="RecordInputFiles.action.isNotSelectedRecording"]'
    ).should('not.exist')
    cy.get(
      '[data-testid="RecordInputFiles.action.isSelectedRecording"]'
    ).should(($elements) => {
      expect($elements).to.have.length(2)
    })
  })
})
