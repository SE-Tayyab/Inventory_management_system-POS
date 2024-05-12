import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DefaultComponent from "../components/DefaultComponent";
import "../style/singleItemPage.css";

const SingleItemPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItemDetails = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/items/get-item/${itemId}`
        );
        setItem(response.data);

        const categoryResponse = await axios.get(
          "http://localhost:5000/api/categories/get-category",
          {
            params: {
              categoryId: response.data.category,
            },
          }
        );
        console.log(categoryResponse.data.name, "tayyab");
        setCategory(categoryResponse.data.name);
      } catch (error) {
        setError(error);
        console.error(error, " while getting item details");
      } finally {
        setIsLoading(false);
      }
    };

    getItemDetails();

    // Clean-up function
    return () => {
      // Add any clean-up logic here if needed
    };
  }, [itemId]); // Fetch item details whenever itemId changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>No item found.</div>;
  }

  return (
    <DefaultComponent>
      <div className="item-details">
        <h2>{item.name}</h2>
        <div className="add-info">
          <div className="table">
            <table className="item-table">
              <tbody>
                <tr>
                  <td>
                    <span className="attribute">Name:</span>
                  </td>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <td>
                    <span className="attribute">Price:</span>
                  </td>
                  <td>${item.price.$numberDecimal}</td>
                </tr>
                <tr>
                  <td>
                    <span className="attribute">Quantity:</span>
                  </td>
                  <td>{item.quantity}</td>
                </tr>
                <tr>
                  <td>
                    <span className="attribute">Category:</span>
                  </td>
                  <td>{category ? category : "Loading..."}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="image">
            <img src={item.image} alt={item.name} className="item-image" />
          </div>
        </div>
      </div>
    </DefaultComponent>
  );
};

export default SingleItemPage;
