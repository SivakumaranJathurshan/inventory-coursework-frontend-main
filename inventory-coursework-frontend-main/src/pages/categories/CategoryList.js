import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { getCategories, deleteCategory } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (err) {
      message.error('Failed to fetch categories');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      message.success('Category deleted');
      fetchCategories();
    } catch {
      message.error('Failed to delete category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => navigate(`/categories/edit/${record.id}`)}>Edit</Button>
          <Popconfirm title="Delete category?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <div>
      <Button type="primary" onClick={() => navigate('/categories/new')} style={{ marginBottom: 16 }}>
        Add Category
      </Button>
      <Table columns={columns} dataSource={categories} rowKey="id" loading={loading} />
    </div>
  );
}

export default CategoryList;
