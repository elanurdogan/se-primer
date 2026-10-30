import './commands';

// Testler Gemini'ye bağlı olmasın: her test, varsayılan olarak sabit Sokratik cevapla başlar.
// Hata senaryosu bu taklidi kendi içinde cy.mockTutorError() ile ezer.
beforeEach(() => {
  cy.mockTutor();
});
