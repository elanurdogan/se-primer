// Tüm seçiciler data-testid üzerinden gider (CLAUDE.md kural 3).
Cypress.Commands.add('getBySel', (testId, options) =>
  cy.get(`[data-testid="${testId}"]`, options)
);

Cypress.Commands.add('tutorMessages', (author, options) =>
  cy.get(`[data-testid="tutor-message"][data-author="${author}"]`, options)
);

Cypress.Commands.add('mockTutor', ({ delay = 0 } = {}) => {
  cy.intercept('POST', '/api/tutor', {
    statusCode: 200,
    fixture: 'tutor-socratic.json',
    delay,
  }).as('tutor');
});

Cypress.Commands.add('mockTutorError', () => {
  cy.intercept('POST', '/api/tutor', {
    statusCode: 500,
    fixture: 'tutor-error.json',
  }).as('tutor');
});

// Karşılamadan brifinge kadar: profil testid sonekleriyle verilir.
Cypress.Commands.add(
  'startGame',
  ({ level = 'beginner', role = 'backend', goal = 'architecture' } = {}) => {
    cy.visit('/');
    cy.getBySel('start-button').click();
    cy.fillProfile({ level, role, goal });
  }
);

Cypress.Commands.add('fillProfile', ({ level, role, goal }) => {
  cy.getBySel(`level-${level}`).click();
  cy.getBySel(`role-${role}`).click();
  cy.getBySel(`goal-${goal}`).click();
  cy.getBySel('profile-submit').should('be.enabled').click();
});

Cypress.Commands.add('goToK1', (profile) => {
  cy.startGame(profile);
  cy.getBySel('briefing-continue').click();
  cy.getBySel('decision-title').should('be.visible');
});

// Sırasıyla üç kararı verir ve son ekrana geçer. K1 ekranından çağrılır.
Cypress.Commands.add('playDecisions', (k1, k2, k3) => {
  [`k1-option-${k1}`, `k2-option-${k2}`, `k3-option-${k3}`].forEach((option) => {
    cy.getBySel(option).click();
    cy.getBySel('outcome-continue').click();
  });
});

// Sayaç setInterval + Date.now kullanır. Yalnızca bunlar dondurulur,
// böylece React ve Vite'ın setTimeout tabanlı işleri gerçek zamanda sürer.
Cypress.Commands.add('freezeTimer', () => {
  cy.clock(Date.now(), ['setInterval', 'clearInterval', 'Date']);
});
