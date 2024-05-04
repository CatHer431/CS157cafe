import React, { useState, useEffect } from "react";
import axios from "axios";

const Recipe = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [inputs, setInputs] = useState({
      name: "",
      description: "",
      ingredients: [{ ingredient: "", quantity: "" }],
    });
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/recipes", {
            withCredentials: true,
          });
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    
    const openModal = () => {
      setShowModal(true);
    };
    
    const closeModal = () => {
      setShowModal(false);
    };
    
    const handleChange = (index, event) => {
      const { name, value } = event.target;
      const updatedIngredients = [...inputs.ingredients];
      updatedIngredients[index][name] = value;
      setInputs({ ...inputs, ingredients: updatedIngredients });
    };
    
    const handleAddIngredient = () => {
      setInputs({
        ...inputs,
        ingredients: [...inputs.ingredients, { ingredient: "", quantity: "" }],
      });
    };
    
    const handleRemoveIngredient = (index) => {
      const updatedIngredients = [...inputs.ingredients];
      updatedIngredients.splice(index, 1);
      setInputs({ ...inputs, ingredients: updatedIngredients });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:3001/recipes-post", inputs, {withCredentials: true,});
        // Reset form inputs
        setInputs({
          name: "",
          description: "",
          ingredients: [{ ingredient: "", quantity: "" }],
        });
        closeModal();
        window.location.reload();
      } catch (err) {
      
      }
    };
    
    
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Recipes</h1>
        <button onClick={openModal}>Add Recipe</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Add Recipe</h2>
              <input
                type="text"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                placeholder="Recipe Name"
              />
              <input
                type="text"
                value={inputs.description}
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
                placeholder="Recipe Description"
              />
              <h3>Ingredients</h3>
              {inputs.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="ingredient"
                    value={ingredient.ingredient}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Ingredient"
                  />
                  <input
                    type="text"
                    name="quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Quantity"
                  />
                  <button onClick={() => handleRemoveIngredient(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={handleAddIngredient}>Add Ingredient</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}

      <table>
        <thead>
          <tr>
            <th>RecipeID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.recipe_id}</td>{" "}
              {/* Replace 'column1' with actual column name from backend */}
              <td>{item.name}</td>{" "}
              {/* Replace 'column2' with actual column name from backend */}
              <td>{item.description}</td>
              <td>{item.ingredients}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recipe;
