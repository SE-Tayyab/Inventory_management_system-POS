import React, { useState } from "react";
import DefaultComponent from "../components/DefaultComponent";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";

function SalesOrders() {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();

  const handleIncrement = (record) => {
    dispatch({
      type: "updateCartItem",
      payload: { ...record, cartquantity: record.cartquantity + 1 },
    });
  };

  const handleDecrement = (record) => {
    if (record.cartquantity > 0) {
      dispatch({
        type: "updateCartItem",
        payload: { ...record, cartquantity: record.cartquantity - 1 },
      });
    }
  };

  const handleInputChange = (e, record) => {
    e.preventDefault();
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) || e.target.value === "") {
      dispatch({
        type: "updateCartItem",
        payload: { ...record, cartquantity: newQuantity || 0 },
      });
    }
  };

  const handleDelete = (record) => {
    dispatch({
      type: "deleteCartItem",
      payload: record,
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `$${price.$numberDecimal}`,
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div style={{ width: "100px" }} className="d-flex align-items-center">
          <PlusCircleOutlined
            className="mx-1"
            style={{ fontSize: "1.5rem" }}
            onClick={() => handleIncrement(record)}
          />
          <input
            style={{ width: "200px" }}
            className="form-control form-control-sm mx-1 text-centor"
            type="number"
            value={record.cartquantity} // Set value to cartquantity
            onChange={(e) => handleInputChange(e, record)} // Pass the record to handleInputChange
          />
          <MinusCircleOutlined
            className="mx-1"
            style={{ fontSize: "1.5rem" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined onClick={() => handleDelete(record)} />
      ),
    },
  ];

  return (
    <DefaultComponent>
      <h1>SalesOrders</h1>
      <Table columns={columns} dataSource={cartItems} bordered />
    </DefaultComponent>
  );
}

export default SalesOrders;
