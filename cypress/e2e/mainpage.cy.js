import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.resetDatabase();
});
describe("testa a rota /recommendations", () => {
  it("lista os videos da tela inicial e cria um video novo", () => {
    const videosArray = [
      "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
      "https://www.youtube.com/watch?v=pVbi7kOXGR4",
      "https://www.youtube.com/watch?v=cNVMmAJOSXI",
      "https://www.youtube.com/watch?v=G8Mm70GVLUs",
    ];

    let youtubeLink =
      videosArray[Math.floor(Math.random() * videosArray.length)];
    const video = {
      name: faker.lorem.words(2),
      youtubeLink,
    };
    cy.homepage();
    cy.get('[data-cy="name"]').type(`${video.name}`);
    cy.get('[data-cy="link"]').type(video.youtubeLink);
    cy.intercept("POST", "http://localhost:5000/recommendations").as("create");
    cy.get('[data-cy="submit"]').click();
    cy.wait("@create");
    cy.url().should("equal", "http://localhost:3000/");
  });
  it("Testa se só lista 10 videos", () => {
    cy.createVideo(12);
    cy.homepage();
    cy.get('[data-cy="video"]').should('have.length', 10)
    
  });
});
describe("Testa rota /recommendations/top", () => {
  it("Testa se lista os videos, na rota /recommendations/top", () => {
    cy.createVideo(12);
    cy.homepage();
    cy.get('[data-cy="top"]').click();
    cy.url().should("equal", "http://localhost:3000/top");
  });
});
describe("Testa rota /recommendations/random", () => {
  it("Testa se lista um video aleatorio, na rota /recommendations/random", () => {
    cy.createVideo(12);
    cy.homepage();
    cy.get('[data-cy="random"]').click();
    cy.url().should("equal", "http://localhost:3000/random");
  });
});
describe("testa upvote e downvote", () => {
  it("Testa se upvote funciona", () => {
    cy.createVideo(1);
    cy.homepage();
    cy.upvote(1)
    cy.contains(1)
  });
  it("Testa se downvote funciona", () => {
    cy.createVideo(1);
    cy.homepage();
    cy.downvote(1)
    cy.contains(-1)
  })
  it("Testa se video é removido quando tem -6 downvotes", () => {
    cy.createVideo(1);
    cy.homepage();
    cy.downvote(6)
    cy.contains("No recommendations yet")
  })
});
