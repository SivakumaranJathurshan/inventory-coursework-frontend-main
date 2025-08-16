import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { getOrders, deleteOrder } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (error) {
      message.error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      message.success('Order deleted');
      fetchOrders();
    } catch {
      message.error('Failed to delete order');
    }
  };

  const columns = [
    { title: 'Order Number', dataIndex: 'orderNumber', key: 'orderNumber' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Phone', dataIndex: 'customerPhone', key: 'customerPhone' },
    { title: 'Status', dataIndex: 'status', key: 'status', 
      render: (status) => OrderStatusLabels[status] || status
    },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount', render: (amt) => `$${amt.toFixed(2)}` },
    { title: 'Order Date', dataIndex: 'orderDate', key: 'orderDate', 
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => navigate(`/orders/edit/${record.id}`)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this order?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  // Map enum values to user-friendly labels
  const OrderStatusLabels = {
    10: 'Pending',
    20: 'Processing',
    30: 'Shipped',
    40: 'Delivered',
    50: 'Cancelled',
  };

  return (
    <>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => navigate('/orders/new')}>
        New Order
      </Button>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </>
  );
}
