import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined, IdcardOutlined, FormOutlined } from '@ant-design/icons';
import { register } from '../services/api';

const { Title, Text } = Typography;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      message.success('Registration successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1890ff 0%, #73d13d 100%)',
        padding: '16px',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24, color: '#1890ff' }}>
          <FormOutlined style={{ marginRight: 8 }} />
          Register Account
        </Title>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name!' }]}
          >
            <Input prefix={<IdcardOutlined style={{ color: '#1890ff' }} />} placeholder="First Name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter your last name!' }]}
          >
            <Input prefix={<IdcardOutlined style={{ color: '#1890ff' }} />} placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input prefix={<MailOutlined style={{ color: '#1890ff' }} />} placeholder="Email address" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password!' },
              { min: 6, message: 'Password must be at least 6 characters.' },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#1890ff' }} />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#1890ff' }} />} placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block icon={<UserOutlined />}>
              Register
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Text>
              Already have an account? <Link to="/login">Login here</Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
