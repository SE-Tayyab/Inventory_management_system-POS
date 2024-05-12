import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultComponent from "../components/DefaultComponent";
import ItemList from "../components/ItemList";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();

  const getAllItems = async () => {
    try {
      dispatch({
        type: "showLoading",
      });
      const response = await axios.get(
        "http://localhost:5000/api/items/get-item"
      );
      setItemsData(response.data);
      dispatch({
        type: "hideLoading",
      });
    } catch (error) {
      console.error(error, " while getting items");
    }
  };

  const refreshItems = async () => {
    await getAllItems();
  };

  useEffect(() => {
    refreshItems();
  }, []);

  return (
    <DefaultComponent>
      <div>
        <div className="px-3 d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Items List</h2>
          <Link to="/add-item">
            <button className="btn btn-primary px-4">Add Item</button>
          </Link>
        </div>

        {itemsData.map((item) => (
          <ItemList key={item.id} item={item} onDelete={refreshItems} />
        ))}
      </div>
    </DefaultComponent>
  );
}

export default Homepage;
