
describe("Recipes Index", () => {
  beforeEach(() => {
    cy.task('db:truncate', 'Recipe')
    cy.task('db:insert', {
      modelName: 'Recipe', 
      json: {
        name: 'Banana Buddies',
        rating: '5',
        cookTime: '25 min', 
        description: 'The most delicious, semi healthy snack everrrr!',
        ingredients: 'mixed veggies, soy sauce', 
        instructions: 'put it in a pan until it tastes gud'
      }
    })
    cy.visit('/')
  })
	
  it('has a heading', () => {
    cy.get('h1')
    .should('have.text', "Top Rated Recipes")
  })

  it("lists all recipes", () => {
    cy.get(".recipe-tile")
    .find("h2")
    .should("have.text", "Banana Buddies")
  })

  it("shows the rating of the recipe", () => {
    cy.get("p").should("have.text", "Rating: 5 StarsThe most delicious, semi healthy snack everrrr!")
  })

  it("has a link to go to the recipe show page", () => {
    cy.get("#recipe-button")
    .should("have.value", "See Reviews")
    .click()
  })
  
})
