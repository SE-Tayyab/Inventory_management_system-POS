import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleItemPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItemDetails = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`http://localhost:5000/api/items/${itemId}`);  
        setItem(response.data);
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
    <div>
      <h1>Item Details</h1>
      <div>
        <h2>{item.name}</h2>
        <p>Price: ${item.price}</p>
        <p>Description: {item.description}</p>
        {/* Render other item details here */}
      </div>
    </div>
  );
};

export default SingleItemPage;
