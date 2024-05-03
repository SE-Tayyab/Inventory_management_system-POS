import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultComponent from '../components/DefaultComponent';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';

function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllItems = async () => {
      setIsLoading(true); // Set loading state before fetching

      try {
        dispatch({
          type: 'showLoading'
        })
        const response = await axios.get("http://localhost:5000/api/items/get-item");
        setItemsData(response.data);
        dispatch({
          type: 'hideLoading',
        })
      } catch (error) {
        setError(error);
        console.error(error, " while getting items");
      } finally {
        setIsLoading(false); // Set loading state to false after fetching (even on error)
      }
    };

    getAllItems();
  }, []); // Or add dependencies if needed (e.g., for refreshing)

  return (
    <DefaultComponent>
      {error ? (
        <div>Error fetching items: {error.message}</div>
      ) : isLoading ? (
        <Loading/> // Loading state while fetching
      ) : itemsData.length === 0 ? (
        <div>No items found.</div> // Handle case where no items are returned
      ) : (
        <div>
          <div>
            <button>add</button>
          </div>
          {itemsData.map((item) => (
            <div style={{width:'100%'}} key={item.id}>
              <ItemList item={item} />
            </div>
          ))}
        </div>
      )}
    </DefaultComponent>
  );
}

export default Homepage;
