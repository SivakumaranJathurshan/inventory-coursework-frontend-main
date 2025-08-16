import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { createCategory, updateCategory, getCategories } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getCategories().then(res => {
        const category = res.data.find(c => c.id === parseInt(id));
        if (category) form.setFieldsValue(category);
      });
    }
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (id) {
        await updateCategory(id, values);
        message.success('Category updated successfully');
      } else {
        await createCategory(values);
        message.success('Category created successfully');
      }
      navigate('/categories');
    } catch {
      message.error('Operation failed');
    }
    setLoading(false);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        {id ? 'Update Category' : 'Create Category'}
      </Button>
    </Form>
  );
}

export default CategoryForm;
