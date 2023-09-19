import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Loading from "../Loading";

export default function FunRecipes() {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRandomRecipe() {
      const apiKey = "3b3c16586e2e4910925945897e22638b"; // Always be cautious about exposing API keys in client-side code
      const endpoint = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setRecipe(data.recipes[0]);
      } catch (error) {
        console.error("Error fetching the recipe:", error);
      }
    }

    fetchRandomRecipe();
  }, []);

  if (!recipe)
    return (
      <Container>
        <Loading />
      </Container>
    );

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row className="recipe-card" style={eventCardStyle}>
        <Col>
          <h2 className="recipe-title">{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          <div className="recipe-summary">
            <strong>Ingredients: </strong>
            <ul>
              {recipe.extendedIngredients?.map((ingredient, idx) => (
                <li key={idx}>{ingredient.name}</li>
              ))}
            </ul>
            <strong>Instructions: </strong>
            <ol>
              {recipe.analyzedInstructions[0]?.steps?.map((step, idx) => (
                <li key={idx}>{step.step}</li>
              ))}
            </ol>
          </div>

          <Button variant="primary" className="recipe-button">
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer">
              View Full Recipe
            </a>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

const eventCardStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
};
