import { faker } from "@faker-js/faker";

Cypress.Commands.add("createVideo", (amount) => {
  const videosArray = [
    "https://www.youtube.com/watch?v=cGOyN-4Kb7U",
    "https://www.youtube.com/watch?v=pVbi7kOXGR4",
    "https://www.youtube.com/watch?v=cNVMmAJOSXI",
    "https://www.youtube.com/watch?v=G8Mm70GVLUs",
  ];

  for (let i = 0; i < Number(amount); i++) {
    let youtubeLink =
      videosArray[Math.floor(Math.random() * videosArray.length)];
    cy.request("POST", "http://localhost:5000/recommendations", {
      name: faker.lorem.words(2),
      youtubeLink,
    }).then((data) => {
      return cy.wrap(JSON.parse(data.requestBody));
    });
  }
});

Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", "http://localhost:5000/e2e/reset");
});
Cypress.Commands.add("homepage", () => {
  cy.visit("http://localhost:3000")
})
