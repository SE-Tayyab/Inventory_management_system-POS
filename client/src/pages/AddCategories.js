import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultComponent from "../components/DefaultComponent";
import CategoryList from "../components/categoryList";

function AddCategories() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [categories, setCategories] = useState([]);

  // Get All the categories:
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/get-categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle changing in form data:
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new category:
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories/add-category",
        formData
      );
      const newCategory = response.data;
      setCategories([...categories, newCategory]); // Add the new category to the categories list
      setFormData({ name: "", image: "" }); // Reset the form data
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Error adding category:", error);
      // Optionally, you can show an error message to the user
    }
  };

  // Function to delete category from category state
  const deleteCategory = async (categoryId) => {
    try {
      await axios.post("http://localhost:5000/api/categories/delete-category", {
        categoryId: categoryId, // Ensure you are passing the correct property
      });
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      ); // Filter out the deleted category
    } catch (error) {
      console.error("Error deleting category:", error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <DefaultComponent>
      <div style={{ width: "100%" }} className="d-flex mt-4">
        <div style={{ width: "50%" }} className="flex-fill ps-3">
          <div style={{ width: "60%" }}>
            <h2>Add New Category</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                  Category Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="categoryImage" className="form-label">
                  Category Image
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryImage"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Category
              </button>
            </form>
          </div>
        </div>
        <div style={{ width: "50%" }} className="flex-fill pe-3">
          <div>
            <h2>All Categories</h2>
            {categories.length === 0 ? (
              <p>No categories available</p>
            ) : (
              <table style={{ width: "100%" }} className="table mt-4">
                <tbody>
                  {categories.map((category) => (
                    <CategoryList
                      key={category._id}
                      item={category}
                      deleteCategory={deleteCategory}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DefaultComponent>
  );
}

export default AddCategories;
