export {}

describe('Click on button example', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/documentation')
    cy.wait(1000)
  })

  it('click on deletion button et show text', () => {
    cy.contains('DELETION').click()
    cy.contains(
      'hide all_planes from 56 seconds until 90 seconds with_frequency = 8'
    ).should('be.visible')
  })

  it('click on alteration button et show text', () => {
    cy.contains('ALTERATION').click()
    cy.contains(
      'alter all_planes at 7 seconds with_values ICAO = "39AC47" and CALLSIGN = "SAMU25"'
    ).should('be.visible')
  })

  it('click on trajectory button et show text', () => {
    cy.contains('TRAJECTORY').click()
    cy.contains(
      'alter all_planes at 56 seconds for 90 seconds with_waypoints' +
        '[(45,78) with_altitude 9000 at 78 seconds,' +
        '(12,70) with_altitude 7000 at 99 seconds,' +
        '(90,11) with_altitude 5000 at 102 seconds,' +
        '(11,89) with_altitude 6000 at 107 seconds,' +
        '(15,90) with_altitude 8000 at 110 seconds]'
    ).should('be.visible')
  })

  it('click on saturation button et show text', () => {
    cy.contains('SATURATION').click()
    cy.contains(
      'saturate all_planes from 56 seconds until 90 seconds with_values' +
        'ICAO = 78 and NUMBER = 45'
    ).should('be.visible')
  })

  it('click on replay button et show text', () => {
    cy.contains('REPLAY').click()
    cy.contains('replay all_planes from 56 seconds until 90 seconds').should(
      'be.visible'
    )
  })

  it('click on delay button et show text', () => {
    cy.contains('DELAY').click()
    cy.contains(
      'delay all_planes from 56 seconds until 90 seconds with_delay 55 seconds'
    ).should('be.visible')
  })

  it('click on rotation button et show text', () => {
    cy.contains('ROTATION').click()
    cy.contains(
      'rotate all_planes from 67 seconds until 99 seconds with_angle 90'
    ).should('be.visible')
  })

  it('click on cut button et show text', () => {
    cy.contains('CUT').click()
    cy.contains('cut all_planes from 13 seconds until 88 seconds').should(
      'be.visible'
    )
  })
})
