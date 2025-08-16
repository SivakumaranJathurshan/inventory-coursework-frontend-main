import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { getProducts, deleteProduct } from '../../services/api';

const { Title } = Typography;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      onOk: async () => {
        try {
          await deleteProduct(id);
          message.success('Product deleted');
          fetchProducts();
        } catch (error) {
          console.error(error);
          message.error('Failed to delete product');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/products/edit/${record.id}`)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        padding: 24,
        margin: '16px',
        overflowX: 'auto',
      }}
    >
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: 16,
          alignItems: 'center',
        }}
      >
        <Space>
  <Button
    type="text"
    icon={<ArrowLeftOutlined style={{ fontSize: 18, color: '#1890ff' }} />}
    onClick={() => navigate(-1)}
  />
  <Title level={3} style={{ margin: 0 }}>
    Products
  </Title>
</Space>

<Button
  type="primary"
  icon={<PlusOutlined />}
  onClick={() => navigate('/products/new')}
>
  Add Product
</Button>
      </Space>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{ pageSize: 6 }}
        scroll={{ x: 'max-content' }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
      />

      <style>{`
        .table-row-light {
          background-color: #ffffff;
        }
        .table-row-dark {
          background-color: #fafafa;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #e6f7ff;
        }
      `}</style>
    </Card>
  );
}
