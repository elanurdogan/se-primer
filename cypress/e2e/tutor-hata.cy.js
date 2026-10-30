describe('Tutor hatası', () => {
  it('dostça hata mesajı gösterir ve oyun devam eder', () => {
    cy.mockTutorError();
    cy.goToK1();

    cy.getBySel('tutor-open').click();
    cy.getBySel('tutor-input').type('Bu kararda neye bakmalıyım?');
    cy.getBySel('tutor-send').click();
    cy.wait('@tutor').its('response.statusCode').should('eq', 500);

    cy.tutorMessages('tutor')
      .should('have.length', 1)
      .and('contain.text', 'Oyuna devam edebilirsin')
      .and('not.contain.text', 'status')
      .and('not.contain.text', 'Tutor could not');
    cy.getBySel('tutor-input').should('be.enabled');
    cy.getBySel('tutor-close').click();
    cy.getBySel('tutor-panel').should('not.exist');

    cy.playDecisions('rollback', 'test', 'mask');
    cy.getBySel('ending-good').should('be.visible');
  });
});
