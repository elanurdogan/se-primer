// spec.md §4.4: süre dolması. cy.tick sayacı gerçek zaman beklemeden ilerletir.
describe('Süre dolması', () => {
  beforeEach(() => {
    cy.freezeTimer();
    cy.goToK1({ level: 'experienced' });
    cy.getBySel('timer').should('contain.text', '60');
  });

  it('60 sn sonunda timeout-notice görünür ve riskli seçenek uygulanır', () => {
    cy.tick(60000);

    cy.getBySel('timeout-notice').should('be.visible');
    cy.getBySel('outcome-what').should('contain.text', 'Karar gelmeyince Nöbetçi DevOps');
    cy.getBySel('outcome-what').should('contain.text', 'canlı ortamda elle');
  });

  it('üç kararda da süre dolarsa riskli yol KÖTÜ sona ve iki nedene gider', () => {
    cy.tick(60000);
    cy.getBySel('timeout-notice').should('be.visible');
    cy.getBySel('outcome-continue').click();

    cy.getBySel('timer').should('contain.text', '60');
    cy.tick(60000);
    cy.getBySel('timeout-notice').should('be.visible');
    cy.getBySel('outcome-what').should('contain.text', '10:45');
    cy.getBySel('outcome-continue').click();

    cy.getBySel('timer').should('contain.text', '60');
    cy.tick(60000);
    cy.getBySel('timeout-notice').should('be.visible');
    cy.getBySel('outcome-continue').click();

    cy.getBySel('ending-bad').should('be.visible');
    cy.getBySel('ending-reason-crash').should('be.visible');
    cy.getBySel('ending-reason-kvkk').should('be.visible');
    cy.getBySel('ending-summary').invoke('text').then((metin) => {
      expect(metin.match(/\(süre doldu\)/g)).to.have.length(3);
    });
  });

  it('sayaç tutor paneli açıkken de işler', () => {
    cy.tick(20000);
    cy.getBySel('timer').should('contain.text', '40');

    cy.getBySel('tutor-open').click();
    cy.getBySel('tutor-panel').should('be.visible');
    cy.tick(20000);
    cy.getBySel('timer').should('contain.text', '20');

    cy.tick(20000);
    cy.getBySel('timeout-notice').should('exist');
    cy.getBySel('tutor-panel').should('be.visible');
  });
});
