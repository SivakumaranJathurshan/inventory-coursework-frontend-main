import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { login } from '../services/api';

const { Title, Text } = Typography;

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });

      const { token, firstName } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', firstName || values.email);

      onLogin(token, firstName || values.email);
      message.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      console.error(error.response || error);
      message.error('Login failed. Please check your credentials.');
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
          maxWidth: 400,
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Title
          level={2}
          style={{ textAlign: 'center', marginBottom: 24, color: '#1890ff' }}
        >
          <LoginOutlined style={{ marginRight: 8 }} />
          Sign In
        </Title>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          initialValues={{ email: '', password: '' }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#1890ff' }} />}
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              icon={<LoginOutlined />}
            >
              Log In
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Text>
              Don't have an account?{' '}
              <Link to="/register">Register here</Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
