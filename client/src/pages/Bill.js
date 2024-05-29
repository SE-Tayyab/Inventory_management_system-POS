import React, { useState, useEffect } from "react";
import DefaultComponent from "../components/DefaultComponent";
import { Button, Table, Spin, Alert, message } from "antd";
import axios from "axios";
import BillDetailsModal from "../pages/Billpage";

const BillPage = () => {
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false); // New state for delete loading
  const [popupModel, setPopupModel] = useState(false);
  const [bills, setBills] = useState([]);
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
      setBills(response.data.data || []);
    } catch (error) {
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearBills = async () => {
    try {
      setDeleteLoading(true); // Set delete loading state to true
      await axios.post("http://localhost:5000/api/bills/delete-bills");
      message.success("All bills deleted");
      fetchBills();
    } catch (e) {
      console.log(e, "Bills are not deleted");
      message.error("Failed to delete bills. Please try again later.");
    } finally {
      setDeleteLoading(false); // Set delete loading state to false
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
        {deleteLoading && (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <Spin tip="Deleting bills..." />
          </div>
        )}

        {/* Spinner for delete loading */}
        {bills.length > 0 ? (
          <Table columns={columns} dataSource={bills} rowKey="_id" />
        ) : (
          !loading && <p className="fs-6 px-3">There are no bills.</p>
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
