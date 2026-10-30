// spec.md §4.3: 8 karar yolu (K1×K2×K3).
const KIL_PAYI = {
  geriHemen: 'geri dönüş yolu kurtardı',
  yamaTest: 'test fail-open hatasını yakaladı',
};

const YOLLAR = [
  { no: 1, k1: 'rollback', k2: 'test', k3: 'mask', son: 'iyi', kilPayi: null },
  { no: 2, k1: 'rollback', k2: 'ship', k3: 'mask', son: 'iyi', kilPayi: KIL_PAYI.geriHemen },
  { no: 3, k1: 'hotfix', k2: 'test', k3: 'mask', son: 'iyi', kilPayi: KIL_PAYI.yamaTest },
  { no: 4, k1: 'hotfix', k2: 'ship', k3: 'mask', son: 'kotu', crash: true, kvkk: false },
  { no: 5, k1: 'rollback', k2: 'test', k3: 'raw', son: 'kotu', crash: false, kvkk: true },
  { no: 6, k1: 'rollback', k2: 'ship', k3: 'raw', son: 'kotu', crash: false, kvkk: true },
  { no: 7, k1: 'hotfix', k2: 'test', k3: 'raw', son: 'kotu', crash: false, kvkk: true },
  { no: 8, k1: 'hotfix', k2: 'ship', k3: 'raw', son: 'kotu', crash: true, kvkk: true },
];

const varlik = (beklenen) => (beklenen ? 'be.visible' : 'not.exist');

describe('8 karar yolu', () => {
  YOLLAR.forEach(({ no, k1, k2, k3, son, kilPayi, crash, kvkk }) => {
    const baslik = son === 'iyi' ? (kilPayi ? 'kıl payı İYİ' : 'temiz İYİ') : 'KÖTÜ';

    it(`#${no} ${k1} + ${k2} + ${k3} → ${baslik}`, () => {
      cy.goToK1();
      cy.playDecisions(k1, k2, k3);

      if (son === 'iyi') {
        cy.getBySel('ending-good').should('be.visible');
        cy.getBySel('ending-bad').should('not.exist');
        cy.getBySel('ending-reason-crash').should('not.exist');
        cy.getBySel('ending-reason-kvkk').should('not.exist');

        if (kilPayi) {
          cy.getBySel('ending-good').should('contain.text', 'Kıl payı');
          cy.getBySel('ending-good').should('contain.text', kilPayi);
        } else {
          cy.getBySel('ending-good').should('not.contain.text', 'Kıl payı');
        }
      } else {
        cy.getBySel('ending-bad').should('be.visible');
        cy.getBySel('ending-good').should('not.exist');
        cy.getBySel('ending-reason-crash').should(varlik(crash));
        cy.getBySel('ending-reason-kvkk').should(varlik(kvkk));
      }
    });
  });
});
