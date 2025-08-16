import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card, Typography, Space } from 'antd';
import { createSupplier, updateSupplier, getSuppliers } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, ContactsOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

function SupplierForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getSuppliers().then(res => {
        const supplier = res.data.find(s => s.id === parseInt(id));
        if (supplier) form.setFieldsValue(supplier);
      });
    }
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (id) {
        await updateSupplier(id, values);
        message.success('Supplier updated successfully');
      } else {
        await createSupplier(values);
        message.success('Supplier created successfully');
      }
      navigate('/suppliers');
    } catch {
      message.error('Operation failed');
    }
    setLoading(false);
  };

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: '40px auto',
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        padding: 24,
      }}
    >
      <Space
        style={{ display: 'flex', marginBottom: 24, alignItems: 'center' }}
        size="middle"
      >
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ fontSize: 18, color: '#1890ff' }} />}
          onClick={() => navigate(-1)}
        />
        <Title level={3} style={{ margin: 0 }}>
          {id ? 'Edit Supplier' : 'Add New Supplier'}
        </Title>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="name"
          label="Supplier Name"
          rules={[{ required: true, message: 'Please enter supplier name' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Supplier Name" />
        </Form.Item>

        <Form.Item
          name="contactPerson"
          label="Contact Person"
          rules={[{ required: true, message: 'Please enter contact person' }]}
        >
          <Input prefix={<ContactsOutlined />} placeholder="Contact Person" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: 'email', required: true, message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input.TextArea prefix={<HomeOutlined />} placeholder="Address" rows={3} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {id ? 'Update Supplier' : 'Create Supplier'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default SupplierForm;
