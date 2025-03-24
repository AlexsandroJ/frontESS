import { BeforeAll, AfterAll,Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Variável para armazenar as notas atuais
let currentNotes = [];
const notes = [
  {
    title: " Um Sonho de Liberdade ",
    note: "muito emocionantes"
  },
  {
    title: "O Poderoso Chefão",
    note: "uma obra de primeira qualidade"
  },
  {
    title: "O Cavaleiro das Trevas",
    note: "um ótimo filme"
  }
]
BeforeAll(() => {
  cy.visit("http://localhost:3000/notes");
  notes.forEach((note) => {
    cy.get('input[placeholder="Digite o título"]').type(note.title);
    cy.get('input[placeholder="Digite a nota"]').type(note.note);
    cy.get('button[type="submit"]').click();

    cy.contains(note.title).should('exist');
    cy.contains(note.note).should('exist');
  });
});

AfterAll(() => {
  cy.visit("http://localhost:3000/notes");

  notes.forEach((note) => {
    
    cy.contains('.font-medium', note.title)
    .closest('.space-y-2') // Navega para o elemento pai (bloco da nota)
    .find('#dell') // Localiza o botão de remoção dentro do bloco
    .click();

  });

});


Given("as seguintes notas do usuario {string} existem:", (userEmail, dataTable) => {

  cy.visit("http://localhost:3000/notes");
  
  //cy.get('button[aria-label="Limpar notas"]').click(); // Exemplo de botão para limpar notas

  currentNotes = dataTable.hashes();
  // Preenche as notas iniciais
  currentNotes.forEach((note) => {
    //cy.get('input[placeholder="Digite o título"]').type(note.title);
    //cy.get('input[placeholder="Digite a nota"]').type(note.note);
    //cy.get('button[type="submit"]').click();

    cy.contains(note.title).should('exist');
    cy.contains(note.note).should('exist');
  });
  
});

// When: Adiciona uma nova nota
When(
  "adiciono uma nova nota para o title {string}, com o seguinte texto {string} do usuario {string}",
  (title, noteText, userEmail) => {
    cy.get('input[placeholder="Digite o título"]').type(title);
    cy.get('input[placeholder="Digite a nota"]').type(noteText);
    cy.get('button[type="submit"]').click();

    // Atualiza a lista de notas
    currentNotes.push({ title, note: noteText });
  }
);

// When: Edita uma nota existente
When(
  "edito a nota do title {string} para {string} do usuario {string}",
  (oldTitle, newNoteText, userEmail) => {
    // Localiza a nota pelo título e clica no botão de edição
    cy.contains('.font-medium', oldTitle)
      .closest('.space-y-2') // Navega para o elemento pai (bloco da nota)
      .find('#edit') // Localiza o botão de edição dentro do bloco
      .click();

    // Edita o campo de nota
    cy.get('input#newNota')
      .clear()
      .type(newNoteText);

    // Salva a alteração
    cy.get("#save").click();
    
  }
);
// When: Remove uma nota existente
When("remover a nota do title {string} do usuario {string}", (titleToRemove, userEmail) => {
  // Localiza a nota pelo título e clica no botão de remoção
  cy.contains('.font-medium', titleToRemove)
    .closest('.space-y-2') // Navega para o elemento pai (bloco da nota)
    .find('#dell') // Localiza o botão de remoção dentro do bloco
    .click();

  // Atualiza a lista de notas removendo a nota excluída
  //currentNotes = currentNotes.filter((note) => note.title !== titleToRemove);
});
// Then: Verifica se as notas estão corretas
Then("as seguintes notas devem existir do usuario {string}:", (userEmail, dataTable) => {
  const expectedNotes = dataTable.hashes();

  // Verifica se cada nota esperada está presente na interface
  expectedNotes.forEach((expectedNote) => {
    cy.contains(expectedNote.title).should("exist");
    cy.contains(expectedNote.note).should("exist");
  });
});