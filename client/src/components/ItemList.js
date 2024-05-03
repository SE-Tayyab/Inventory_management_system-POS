import React from "react";
import "../style/itempage.css";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch({
      type: "updateCart",
      payload: { ...item, cartquantity: 1 },
    });
  };
  // const preventNavigation = (e) => {

  // };
  return (
    <Link to={`/item/${item._id}`}>
      <div className="item-list-item border rounded p-3 mb-3 d-flex flex-column">
        <div className="content">
          <div className="ImageDiv">
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded"
              style={{ height: "100px", width: "100px" }}
            />
          </div>

          <h5 className="item-title card-title">{item.name}</h5>
          <p className="item-category text-muted">{item.category}</p>

          <p className="mb-0">
            <span className="fw-bold">Price:</span> ${item.price.$numberDecimal}
          </p>
          {item.quantity && (
            <p className="item-quantity text-muted mb-0">
              <span className="fw-bold">Quantity:</span> {item.quantity}
            </p>
          )}

          <div className="button">
            <button onClick={(e) => handleAddToCart(e)}>Sale</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemList;
