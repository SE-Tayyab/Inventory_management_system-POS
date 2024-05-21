import React, { useState, useEffect } from "react";
import DefaultComponent from "../components/DefaultComponent";
import { Button, Table, Spin, Alert } from "antd";
import axios from "axios";
import BillDetailsModal from "../pages/Billpage";

const BillPage = () => {
  const [loading, setLoading] = useState(true);
  const [popupModel, setPopupModel] = useState(false);
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/bills/get-bills"
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch bills");
      }
      setBills(response.data.data);
    } catch (error) {
      setError("Failed to fetch bills. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Tax Rate",
      dataIndex: "taxRate",
      key: "taxRate",
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => showDetails(record)}>Print</Button>
      ),
    },
  ];

  const showDetails = (record) => {
    setSelectedBill(record);
    setPopupModel(true);
  };

  return (
    <DefaultComponent>
      <div className="bill-page">
        <h1>Bill Page</h1>
        {loading && <Spin />}
        {error && <Alert message={error} type="error" />}
        {bills.length > 0 && (
          <Table columns={columns} dataSource={bills} rowKey="_id" />
        )}
        <BillDetailsModal
          visible={popupModel}
          bill={selectedBill}
          onClose={() => setPopupModel(false)}
        />
      </div>
    </DefaultComponent>
  );
};

export default BillPage;
