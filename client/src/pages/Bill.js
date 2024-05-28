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

  const handleClearBills = async () => {
    await axios.post("http://localhost:5000/api/bills/");
  };

  return (
    <DefaultComponent>
      <div className="bill-page">
        <div
          style={{ width: "40.5vw" }}
          className="d-flex align-items-center justify-content-between bg-primary text-white p-3 rounded mb-4"
        >
          <h1>Bills</h1>
          <Button
            onClick={handleClearBills}
            className="btn btn-danger d-flex align-items-center justify-content-centor"
          >
            Clear all Bills
          </Button>
        </div>
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
