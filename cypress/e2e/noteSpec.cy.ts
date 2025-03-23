
describe('Testes de Interface Notas de Usuario', () => {

  beforeEach(() => {
    //cy.visit('http://opinai.ddns.net/notes');
    cy.visit('http://localhost:3000/notes/');
  });

  it('Deve visualizar notas', () => {
    cy.contains('O Senhor dos Anéis: O Retorno do Rei').should('exist');
    cy.contains('uma jornada épica inesquecível').should('exist');
  });

  it('Deve adicionar uma nova nota', () => {
    // Preencher o campo de título
    cy.get('input[placeholder="Digite o título"]').type('Nova Nota');
    // Preencher o campo de nota
    cy.get('input[placeholder="Digite a nota"]').type('Esta é uma nota de teste.');
    // Clicar no botão de envio
    cy.get('button[type="submit"]').click();
    // Verificar se a nota foi adicionada corretamente (exemplo)
    cy.contains('Nova Nota').should('exist');
    cy.contains('Esta é uma nota de teste.').should('exist');
  });
  
  it('Deve Editar nova Existente', () => {

    cy.contains('.font-medium', 'Nova Nota')
      .closest('.space-y-2') // Navega para o elemento pai (bloco da nota)
      .find('#edit') // Localiza o botão de remoção dentro do bloco
      .click();

    cy.get('input#newNota')
      .clear()
      .type('Nota editada com sucesso');

    cy.get("#save").click();

    cy.contains('Nota editada com sucesso').should('exist');
  });

  it('Deve remover a nota adicionada', () => {
    cy.contains('Nova Nota').should('exist'); // Garante que a nota existe antes de remover
    // Localizar o botão de remoção associado à nota
    // Localiza a nota pelo título
    cy.contains('Nova Nota')
      .closest('.space-y-2') // Navega para o elemento pai (bloco da nota)
      .find('#dell') // Localiza o botão de remoção dentro do bloco
      .click();
    // Verificar se a nota foi removida
    cy.contains('Nova Nota').should('not.exist');
  });

})