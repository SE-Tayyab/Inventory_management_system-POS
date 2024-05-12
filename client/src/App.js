import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import SalesOrders from "./pages/SalesOrders";
import SingleItemPage from "./pages/SingleItemPage";
import AddItem from "./pages/AddItem";
import UpdateItem from "./pages/UpdateItem";
import AddCategories from "./pages/AddCategories";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/salesorders" element={<SalesOrders />} />
          <Route path="/items/:itemId" element={<SingleItemPage />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/edit-item/:itemId" element={<UpdateItem />} />
          <Route path="/add-categories" element={<AddCategories />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
