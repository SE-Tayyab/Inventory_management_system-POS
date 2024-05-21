import React, { useEffect, useState } from "react";
import DefaultComponent from "../components/DefaultComponent";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  Table,
  Button,
  Modal,
  InputNumber,
  Form,
  Input,
  Radio,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SalesOrders() {
  const [subtotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const [taxRate, setTaxRate] = useState(10);
  const { cartItems } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();
  const navegate = useNavigate();
  const [form] = Form.useForm();

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

  const handleInputChange = (value, record) => {
    dispatch({
      type: "updateCartItem",
      payload: { ...record, cartquantity: value },
    });
  };

  const handleDelete = (record) => {
    dispatch({
      type: "deleteCartItem",
      payload: record,
    });
  };

  const onFinish = async (values) => {
    const newObject = {
      ...values,
      totalAmount: subtotal,
      grandTotal:
        subtotal + parseFloat(((subtotal / 100) * taxRate).toFixed(2)),
      cartItems,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bills/add-bill",
        newObject
      );
      if (response.status === 200) {
        setBillPopup(false);
        message.success("Invoice created successfully:");
        form.resetFields();
        clearInvoice();
        navegate("/bills");
      }
    } catch (error) {
      console.log("Error while adding request:", error);
    }
  };

  const handleTax = (value) => {
    setTaxRate(value);
  };

  const clearInvoice = () => {
    localStorage.removeItem("cartItems");
    dispatch({
      type: "clear-cart",
    });
  };

  useEffect(() => {
    let temp = 0;
    cartItems.forEach(
      (item) => (temp += item.price.$numberDecimal * item.cartquantity)
    );
    setSubTotal(temp);
  }, [cartItems]);

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
        <div className="d-flex align-items-center">
          <PlusCircleOutlined onClick={() => handleIncrement(record)} />
          <InputNumber
            min={0}
            value={record.cartquantity}
            onChange={(value) => handleInputChange(value, record)}
          />
          <MinusCircleOutlined onClick={() => handleDecrement(record)} />
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
      <h1>Sales Orders</h1>
      <div className="d-flex align-items-center justify-content-between mb-2 mt-3">
        <div>
          <Button
            type="primary"
            className="ml-3"
            style={{ marginRight: "10px" }}
            onClick={() => setBillPopup(true)}
          >
            Create Invoice
          </Button>
          <Button onClick={clearInvoice} className="ml-3" type="primary">
            Clear All
          </Button>
        </div>
        <div className="d-flex align-items-center">
          <hr className="mr-2" />
          <h3 className="mb-0">
            Total Amount: <b>${subtotal}</b> /-
          </h3>
        </div>
      </div>
      <Table columns={columns} dataSource={cartItems} bordered />

      <Modal
        title="Create Invoice"
        open={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[{ required: true, message: "Please input customer name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[
              { required: true, message: "Please select payment method!" },
            ]}
          >
            <Radio.Group>
              <Radio value="cash">Cash</Radio>
              <Radio value="card">Card</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Tax Rate (%)" name="taxRate" initialValue={taxRate}>
            <InputNumber onChange={(value) => handleTax(value)} min={0} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <Form.Item>
            <div className="bill-it">
              <h3>Total Amount: ${subtotal} /-</h3>
              <h3>TAX: {((subtotal / 100) * taxRate).toFixed(2)}</h3>
              <h3>
                Grand TOTAL:{" "}
                {subtotal + parseFloat(((subtotal / 100) * taxRate).toFixed(2))}
              </h3>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </DefaultComponent>
  );
}

export default SalesOrders;
