// spec.md §2: seviye, rol ve hedefin ekrana etkisi.
describe('Kişiselleştirme', () => {
  context('Seviye', () => {
    it('yeni başlayan: ipucu kartı var, sayaç yok', () => {
      cy.goToK1({ level: 'beginner' });
      cy.getBySel('hint-box').should('be.visible');
      cy.getBySel('hint-toggle').should('not.exist');
      cy.getBySel('timer').should('not.exist');
    });

    it('orta seviye: hint-toggle var, basınca ipucu açılır', () => {
      cy.goToK1({ level: 'intermediate' });
      cy.getBySel('hint-box').should('not.exist');
      cy.getBySel('timer').should('not.exist');

      cy.getBySel('hint-toggle').should('be.visible').click();
      cy.getBySel('hint-box').should('be.visible');
    });

    it('deneyimli: sayaç var, ipucu kartı yok', () => {
      cy.goToK1({ level: 'experienced' });
      cy.getBySel('timer').should('be.visible');
      cy.getBySel('hint-box').should('not.exist');
      cy.getBySel('hint-toggle').should('not.exist');
    });
  });

  context('Rol', () => {
    const ROLLER = [
      { rol: 'backend', k1: 'ProvizyonClient', k2: '57 satır', k3: 'PROVIZYON_TIMEOUT' },
      { rol: 'qa', k1: '%58', k2: 'Hazır test senaryoları', k3: 'sentetik reçete' },
      { rol: 'pm', k1: 'Tahmini süreler', k2: 'Gecikme maliyeti', k3: 'Paydaşlar' },
    ];

    ROLLER.forEach(({ rol, k1, k2, k3 }) => {
      it(`${rol}: rol kartı üç kararda role göre değişir`, () => {
        cy.goToK1({ role: rol });
        cy.getBySel('role-card').should('contain.text', k1);

        cy.getBySel('k1-option-rollback').click();
        cy.getBySel('outcome-continue').click();
        cy.getBySel('role-card').should('contain.text', k2);

        cy.getBySel('k2-option-test').click();
        cy.getBySel('outcome-continue').click();
        cy.getBySel('role-card').should('contain.text', k3);
      });
    });
  });

  context('Hedef', () => {
    const HEDEFLER = [
      { hedef: 'architecture', rozetler: [true, false, false] },
      { hedef: 'testing', rozetler: [false, true, false] },
      { hedef: 'kvkk', rozetler: [false, false, true] },
    ];

    const rozetKontrol = (var_mi) =>
      cy.getBySel('focus-badge').should(var_mi ? 'be.visible' : 'not.exist');

    HEDEFLER.forEach(({ hedef, rozetler }) => {
      it(`${hedef}: odak rozeti yalnızca odak kararda görünür`, () => {
        cy.goToK1({ goal: hedef });
        rozetKontrol(rozetler[0]);

        cy.getBySel('k1-option-rollback').click();
        cy.getBySel('outcome-continue').click();
        cy.getBySel('decision-title').should('be.visible');
        rozetKontrol(rozetler[1]);

        cy.getBySel('k2-option-test').click();
        cy.getBySel('outcome-continue').click();
        cy.getBySel('decision-title').should('be.visible');
        rozetKontrol(rozetler[2]);
      });
    });
  });
});
