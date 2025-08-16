import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';

const { Option } = Select;

export default function ProductForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories and suppliers for dropdowns
    API.get('/categories')
      .then(res => setCategories(res.data))
      .catch(() => message.error('Failed to load categories'));

    API.get('/suppliers')
      .then(res => setSuppliers(res.data))
      .catch(() => message.error('Failed to load suppliers'));

    // If editing existing product, fetch data
    if (id) {
      setLoading(true);
      API.get(`/products/${id}`)
        .then(res => {
          form.setFieldsValue(res.data);
        })
        .catch(() => message.error('Failed to load product data'))
        .finally(() => setLoading(false));
    }
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (id) {
        await API.put(`/products/${id}`, values);
        message.success('Product updated successfully');
      } else {
        await API.post('/products', values);
        message.success('Product created successfully');
      }
      navigate('/products');
    } catch (error) {
      message.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        price: 0,
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter product name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        label="SKU"
        name="sku"
        rules={[{ required: true, message: 'Please enter SKU' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please enter price' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: 'Please select category' }]}
      >
        <Select placeholder="Select category" allowClear>
          {categories.map(cat => (
            <Option key={cat.id} value={cat.id}>{cat.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Supplier"
        name="supplierId"
        rules={[{ required: true, message: 'Please select supplier' }]}
      >
        <Select placeholder="Select supplier" allowClear>
          {suppliers.map(sup => (
            <Option key={sup.id} value={sup.id}>{sup.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {id ? 'Update Product' : 'Create Product'}
        </Button>
      </Form.Item>
    </Form>
  );
}
