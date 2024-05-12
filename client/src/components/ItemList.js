import React, { useState, useEffect } from "react";
import "../style/itempage.css";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemList = ({ item, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const { cartItems } = useSelector((state) => state.rootReducer);

  // Check if the item is already in the cart
  useEffect(() => {
    const found = cartItems.some((cartItem) => cartItem._id === item._id);
    setIsChecked(found);
  }, [cartItems, item]);

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
    if (!isChecked) {
      dispatch({ type: "updateCart", payload: { ...item, cartquantity: 1 } });
    } else {
      dispatch({ type: "deleteCartItem", payload: item });
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    try {
      await axios.post("http://localhost:5000/api/items/get-item/delete-item", {
        itemId: item._id,
      });
      onDelete();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    const getCategoryName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/get-category",
          {
            params: {
              categoryId: item.category,
            },
          }
        );
        setCategoryName(response.data.name);
      } catch (error) {
        console.log(error, "Retrieving category name");
      }
    };
    getCategoryName();
  }, [item.category]);

  const handleNavigate = (e) => {
    // e.stopPropagation();
    navigate(`/items/${item._id}`);
  };

  return (
    <div
      // onClick={handleNavigate}
      className="item-list-item border rounded p-3 mb-3 d-flex flex-column"
    >
      <div className="content">
        <div>
          <input
            onChange={handleCheckboxChange}
            checked={isChecked}
            style={{ width: "20px" }}
            type="checkbox"
          ></input>
        </div>
        <div className="ImageDiv" style={{ width: "70px" }}>
          <img
            src={item.image}
            alt={item.name}
            className="img-fluid rounded"
            style={{ height: "70px", width: "70px" }}
          />
        </div>

        <h5
          className="item-title card-title"
          style={{ width: "100px" }}
          onClick={handleNavigate}
        >
          {item.name}
        </h5>
        <p className="item-category text-muted" style={{ width: "100px" }}>
          {categoryName}
        </p>

        <p className="mb-0" style={{ width: "100px" }}>
          <span className="fw-bold">Price:</span> ${item.price.$numberDecimal}
        </p>
        {item.quantity && (
          <p
            className="item-quantity text-muted mb-0"
            style={{ width: "100px" }}
          >
            <span className="fw-bold">Quantity:</span> {item.quantity}
          </p>
        )}

        <div className="button btn-group">
          <Link to={{ pathname: `/edit-item/${item._id}` }}>
            <button className="editButton btn btn-primary">
              <EditOutlined />
            </button>
          </Link>
          <button
            className="editButton btn btn-danger"
            onClick={handleDeleteClick}
          >
            <DeleteOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
