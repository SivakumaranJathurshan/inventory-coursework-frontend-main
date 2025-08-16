// src/pages/orders/OrderForm.js
import React, { useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { createOrder, updateOrder, getOrderById } from '../../services/api';

const { Option } = Select;

const OrderStatusOptions = [
  { value: 10, label: 'Pending' },
  { value: 20, label: 'Processing' },
  { value: 30, label: 'Shipped' },
  { value: 40, label: 'Delivered' },
  { value: 50, label: 'Cancelled' },
];

export default function OrderForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      getOrderById(id)
        .then(res => {
          const data = res.data;
          // Remove orderDate from form values, as it's not used in your payload
          const { orderDate, createdDate, updatedDate, ...rest } = data;
          form.setFieldsValue(rest);
        })
        .catch(() => {
          message.error('Failed to load order');
          navigate('/orders');
        });
    }
  }, [id, isEdit, form, navigate]);

  const onFinish = async (values) => { 
    try {
      if (isEdit) {
        await updateOrder(id, values);
        message.success('Order updated successfully');
      } else {
        await createOrder(values);
        message.success('Order created successfully');
      }
      navigate('/orders');
    } catch (error) {
      message.error('Failed to save order');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        status: 10,
        totalAmount: 0,
      }}
    >
      {/* Show order number only when editing, read-only */}
      {isEdit && (
        <Form.Item label="Order Number" name="orderNumber">
          <Input readOnly />
        </Form.Item>
      )}

      <Form.Item
        label="Customer Name"
        name="customerName"
        rules={[{ required: true, message: 'Please input customer name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Customer Address" name="customerAddress">
        <Input.TextArea rows={2} />
      </Form.Item>

      <Form.Item label="Customer Phone" name="customerPhone">
        <Input />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please select status' }]}
      >
        <Select>
          {OrderStatusOptions.map(({ value, label }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Total Amount"
        name="totalAmount"
        rules={[{ required: true, message: 'Please input total amount' }]}
      >
        <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'Update Order' : 'Create Order'}
        </Button>
      </Form.Item>
    </Form>
  );
}
