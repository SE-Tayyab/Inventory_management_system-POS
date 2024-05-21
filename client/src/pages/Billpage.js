import React from "react";
import { Button, Modal, Table } from "antd";
import moment from "moment-timezone";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const BillDetailsModal = ({ visible, bill, onClose }) => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  if (!bill) {
    return null; // Return null if bill is null or undefined
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `$${price.$numberDecimal}`,
    },
    // Add more columns as needed
  ];

  return (
    <Modal
      title="Invoice Details"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div ref={contentToPrint} className="container p-3">
        <h2 className="text-center">Tayyab Sattar</h2>
        <div className="row mb-3">
          <div className="col-md-6"></div>
          <div className="text-center">
            <p className="text-center">Contact Us: +92 3492250007</p>
          </div>
        </div>
        {/* Customer Information */}
        <div className="mb-3">
          <h3>Customer Information</h3>
          <p>Name: {bill.customerName || "N/A"}</p>
          {/* Add more customer information fields as needed */}
        </div>
        {/* Bill Items */}
        <div className="mb-3">
          <h3>Bill Items</h3>
          {/* Display bill items */}
          <Table
            columns={columns}
            dataSource={bill.cartItems} // Assuming items is an array of bill items
            rowKey="_id"
          />
        </div>
        {/* Total Amount and Tax */}
        <div className="mb-3">
          <h3>Total Amount: {bill.totalAmount}</h3>
          <h3>Tax: {bill.taxRate}%</h3>
          <h3>Grand Total: {bill.grandTotal}</h3>
        </div>
        {/* Created At */}
        <div>
          Created At:{" "}
          {moment(bill.createdAt)
            .tz("Asia/Karachi")
            .format("YYYY-MM-DD HH:mm:ss")}
        </div>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
            type="primary"
            className="d-flex justify-content-end"
          >
            Print
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BillDetailsModal;
