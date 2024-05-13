import React, { useState, useEffect } from "react";
import DefaultComponent from "./DefaultComponent";
import axios from "axios";
import { message } from "antd";

function AddProduct({ item }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    image: null, // Changed from empty string to null
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        name: "",
        price: "",
        quantity: "",
        category: "",
        image: null, // Changed from empty string to null
      });
    }
  }, [item]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("image", formData.image);

      if (item) {
        await axios.put(
          `http://localhost:5000/api/items/edit-item/${item._id}`,
          formDataToSend
        );
        message.success("Item Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/items/add-item",
          formDataToSend
        );
        message.success("Item Added Successfully");
      }
    } catch (error) {
      console.error("Error adding/editing item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // If it's a file input, set the file object
    const newValue = name === "image" ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  return (
    <DefaultComponent>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-5"
        style={{ maxWidth: "600px" }}
      >
        <h2>{item ? "Edit Product" : "Add New Product"}</h2>

        {/* Form fields */}
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price.$numberDecimal}
            onChange={handleChange}
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleChange}
            required={!item} // Required only when adding a new item
          />
        </div>

        {/* Submit button with dynamic text based on operation */}
        <div className="text-end">
          <button type="submit" className="btn btn-primary">
            {item ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </DefaultComponent>
  );
}

export default AddProduct;
