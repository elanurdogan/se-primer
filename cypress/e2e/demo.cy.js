// 60 sn'lik demo videosunun senaryosu. Doğrulama değil anlatım testidir:
// beklemeler, ekranların videoda okunabilmesi içindir. Tutor burada da fixture'dan döner.
const OKUMA_MS = 2200;

const sonucuGoster = () => {
  cy.getBySel('outcome-what').scrollIntoView({ offset: { top: -90, left: 0 } }).should('be.visible');
  cy.wait(OKUMA_MS);
  cy.getBySel('outcome-why').scrollIntoView({ offset: { top: -90, left: 0 } }).should('be.visible');
  cy.wait(OKUMA_MS);
  cy.getBySel('outcome-continue').click();
};

describe('Demo', () => {
  it('profil → 3 karar → tutor → İYİ son → yeniden oyna', () => {
    cy.mockTutor({ delay: 900 });
    cy.visit('/');
    cy.wait(1500);
    cy.getBySel('start-button').click();

    cy.wait(600);
    cy.getBySel('level-beginner').click();
    cy.wait(600);
    cy.getBySel('role-backend').click();
    cy.wait(600);
    cy.getBySel('goal-kvkk').click();
    cy.wait(600);
    cy.getBySel('profile-submit').click();

    cy.getBySel('briefing-role-message').should('be.visible');
    cy.wait(OKUMA_MS);
    cy.getBySel('briefing-continue').click();

    // K1: seçimden önce tutor bir kez açılır ve kapanır.
    cy.getBySel('hint-box').should('be.visible');
    cy.wait(OKUMA_MS);
    cy.getBySel('tutor-open').click();
    cy.getBySel('tutor-input').type('Hangisini seçmeliyim?', { delay: 40 });
    cy.getBySel('tutor-send').click();
    cy.tutorMessages('tutor').should('have.length', 1);
    cy.wait(OKUMA_MS + 800);
    cy.getBySel('tutor-close').click();
    cy.wait(500);

    cy.getBySel('k1-option-rollback').click();
    sonucuGoster();

    cy.getBySel('decision-title').should('be.visible');
    cy.wait(OKUMA_MS);
    cy.getBySel('k2-option-test').click();
    sonucuGoster();

    cy.getBySel('decision-title').should('be.visible');
    cy.wait(OKUMA_MS);
    cy.getBySel('k3-option-mask').click();
    sonucuGoster();

    cy.getBySel('ending-good').should('be.visible');
    cy.wait(OKUMA_MS);
    cy.getBySel('ending-summary').scrollIntoView({ offset: { top: -90, left: 0 } });
    cy.wait(OKUMA_MS);
    cy.getBySel('ending-role-lesson').scrollIntoView({ offset: { top: -90, left: 0 } });
    cy.wait(OKUMA_MS);
    cy.getBySel('restart-button').click();

    cy.getBySel('start-button').should('be.visible');
    cy.wait(1500);
  });
});
