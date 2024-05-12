import React from "react";
import { Card } from "antd";
import { useDispatch } from "react-redux";
import { message } from "antd";

const { Meta } = Card;

function ItemCard({ item }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch({ type: "updateCart", payload: { ...item, cartquantity: 1 } });
    message.success("Item Added To Card");
  };

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src={item.image}
          style={{
            height: "200px", // Set the fixed height
            width: "100%", // Ensure full width
            objectFit: "cover", // Ensure the image covers the container
          }}
          className="d-block mx-auto my-2"
        />
      }
    >
      <Meta
        title={item.name}
        description={`price: ${item.price.$numberDecimal}`}
      />
      <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </Card>
  );
}
export default ItemCard;
