
describe('Testes de Interface Notas de Usuario', () => {

  beforeEach(() => {
    cy.visit('localhost:3000/notes');
  });

  it('Deve visualizar notas', () => {
    cy.contains('O Senhor dos Anéis: O Retorno do Rei').should('exist');
    cy.contains('uma jornada épica inesquecível').should('exist');
  });


})