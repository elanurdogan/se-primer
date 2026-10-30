describe('Profil ekranı', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getBySel('start-button').click();
  });

  it('profile-submit 3 soru cevaplanmadan pasiftir', () => {
    cy.getBySel('profile-submit').should('be.disabled');

    cy.getBySel('level-intermediate').click();
    cy.getBySel('profile-submit').should('be.disabled');

    cy.getBySel('role-qa').click();
    cy.getBySel('profile-submit').should('be.disabled');

    cy.getBySel('goal-kvkk').click();
    cy.getBySel('profile-submit').should('be.enabled');
  });

  it('herhangi bir soru eksikken pasif kalır', () => {
    cy.getBySel('role-pm').click();
    cy.getBySel('goal-testing').click();
    cy.getBySel('profile-submit').should('be.disabled');
  });
});

describe('Yeniden oyna (spec.md §4.5)', () => {
  const PROFIL = { level: 'beginner', role: 'backend', goal: 'testing' };
  const oyunuBitir = () => {
    cy.getBySel('briefing-continue').click();
    cy.playDecisions('rollback', 'test', 'mask');
    cy.getBySel('restart-button').click();
  };

  beforeEach(() => {
    cy.startGame(PROFIL);
    cy.window().then((win) => {
      win.__yenilenmedi = true;
    });
  });

  it('sayfayı yenilemeden karşılama ekranına döner', () => {
    oyunuBitir();

    cy.getBySel('start-button').should('be.visible');
    cy.window().its('__yenilenmedi').should('eq', true);
  });

  it('tutor geçmişi sıfırlanır', () => {
    cy.getBySel('tutor-open').click();
    cy.getBySel('tutor-input').type('Nereden başlamalıyım?');
    cy.getBySel('tutor-send').click();
    cy.tutorMessages('tutor').should('have.length', 1);
    cy.getBySel('tutor-close').click();

    oyunuBitir();
    cy.getBySel('start-button').click();
    cy.fillProfile(PROFIL);
    cy.getBySel('tutor-open').click();

    cy.getBySel('tutor-panel').should('be.visible');
    cy.getBySel('tutor-message').should('not.exist');
  });

  it('profilin üç cevabı da sıfırlanır', () => {
    // Her turda iki soru yanıtlanır. Buton pasif kalıyorsa üçüncü cevap sıfırlanmıştır.
    const TURLAR = [
      ['level-beginner', 'role-backend', 'goal-testing'],
      ['level-beginner', 'goal-testing', 'role-backend'],
      ['role-backend', 'goal-testing', 'level-beginner'],
    ];

    TURLAR.forEach(([birinci, ikinci, ucuncu]) => {
      oyunuBitir();
      cy.getBySel('start-button').click();
      cy.getBySel('profile-submit').should('be.disabled');

      cy.getBySel(birinci).click();
      cy.getBySel(ikinci).click();
      cy.getBySel('profile-submit').should('be.disabled');

      cy.getBySel(ucuncu).click();
      cy.getBySel('profile-submit').should('be.enabled').click();
    });
  });
});
