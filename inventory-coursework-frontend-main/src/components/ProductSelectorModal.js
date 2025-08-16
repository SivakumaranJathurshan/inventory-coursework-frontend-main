import React, { useEffect, useState } from 'react';
import { Modal, Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import API from '../services/api';

const ProductSelectorModal = ({ visible, onSelect, onCancel }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchProducts();
    }
  }, [visible]);

  // Filter products based on search text
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
      render: (_, record) => record.category?.name || '-',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => `$${price?.toFixed(2) || '0.00'}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => onSelect(record)}>
          Select
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title="Select Product"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Input
        placeholder="Search products"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ y: 300 }}
      />
    </Modal>
  );
};

export default ProductSelectorModal;
