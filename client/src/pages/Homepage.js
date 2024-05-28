import React, { useState, useEffect } from "react";
import DefaultComponent from "../components/DefaultComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import ItemCard from "../components/ItemCard";

function Homepage() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState();
  const [selectedCategory, setSelectedCategory] = useState("All Items");

  useEffect(() => {
    getAllItems();
    getTotalAmount();
  }, []);

  const getAllItems = async () => {
    try {
      dispatch({
        type: "showLoading",
      });
      const itemsRes = await axios.get(
        "http://localhost:5000/api/items/get-item"
      );
      const categoriesRes = await axios.get(
        "http://localhost:5000/api/categories/get-categories"
      );

      setItems(itemsRes.data);
      setCategories(categoriesRes.data);

      dispatch({
        type: "hideLoading",
      });
    } catch (e) {
      console.log(e, "Homepage.js");
    }
  };

  const getTotalAmount = async () => {
    try {
      dispatch({
        type: "showLoading",
      });
      const totalAmount = await axios.get(
        "http://localhost:5000/api/bills/total-earnings"
      );

      setAmount(totalAmount.data.totalEarnings);
      dispatch({
        type: "hideLoading",
      });
    } catch (e) {
      console.log(e, "Homepage.js");
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <DefaultComponent>
      <div
        style={{ width: "41.5vw" }}
        className="d-flex align-items-center justify-content-between bg-primary text-white p-3 rounded mb-4"
      >
        <div style={{ width: "30%" }} className="categories">
          <select
            onChange={handleCategoryChange}
            className="form-select bg-light"
          >
            <option defaultValue>All Items</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="total-amount fs-5">
          Total Amount: <span className="text-warning">{amount}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "35px",
        }}
      >
        {selectedCategory === "All Items"
          ? items.map((item) => (
              <div key={item.id}>
                <ItemCard item={item} />
              </div>
            ))
          : items
              .filter((i) => i.category === selectedCategory)
              .map((item) => (
                <div key={item.id}>
                  <ItemCard item={item} />
                </div>
              ))}
      </div>
    </DefaultComponent>
  );
}

export default Homepage;
