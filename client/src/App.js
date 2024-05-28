import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import SalesOrders from "./pages/SalesOrders";
import SingleItemPage from "./pages/SingleItemPage";
import AddItem from "./pages/AddItem";
import UpdateItem from "./pages/UpdateItem";
import AddCategories from "./pages/AddCategories";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Bill from "./pages/Bill";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <ItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salesorders"
          element={
            <ProtectedRoute>
              <SalesOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items/:itemId"
          element={
            <ProtectedRoute>
              <SingleItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-item"
          element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-item/:itemId"
          element={
            <ProtectedRoute>
              <UpdateItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-categories"
          element={
            <ProtectedRoute>
              <AddCategories />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <Bill />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
