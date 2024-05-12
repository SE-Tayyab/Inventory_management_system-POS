import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddProduct from "../components/Add&UpdateProduct";
import axios from "axios";

function UpdateItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/items/get-item/${itemId}`
        );
        setItem(res.data);
      } catch (err) {
        console.log(err, "while getItem in updateItem.js");
      }
    };

    getItem();
  }, [itemId]);
  console.log(item);
  return (
    <>
      <AddProduct item={item} />
    </>
  );
}

export default UpdateItem;
