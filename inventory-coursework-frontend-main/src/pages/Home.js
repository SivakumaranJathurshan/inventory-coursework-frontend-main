import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ShopOutlined,
  AppstoreOutlined,
  TagsOutlined,
  ShoppingCartOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const entities = [
  { name: 'Suppliers', path: '/suppliers', icon: <ShopOutlined style={{ fontSize: 40, color: '#fff' }} />, bg: 'linear-gradient(135deg, #1890ff, #40a9ff)' },
  { name: 'Products', path: '/products', icon: <AppstoreOutlined style={{ fontSize: 40, color: '#fff' }} />, bg: 'linear-gradient(135deg, #52c41a, #73d13d)' },
  { name: 'Categories', path: '/categories', icon: <TagsOutlined style={{ fontSize: 40, color: '#fff' }} />, bg: 'linear-gradient(135deg, #fa8c16, #ffc069)' },
  { name: 'Orders', path: '/orders', icon: <ShoppingCartOutlined style={{ fontSize: 40, color: '#fff' }} />, bg: 'linear-gradient(135deg, #eb2f96, #ff85c0)' },
  { name: 'Inventory', path: '/inventory', icon: <DatabaseOutlined style={{ fontSize: 40, color: '#fff' }} />, bg: 'linear-gradient(135deg, #722ed1, #9254de)' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '16px' }}>
      <Row gutter={[16, 16]}>
        {entities.map((entity) => (
          <Col xs={24} sm={12} md={8} lg={6} key={entity.name}>
            <Card
              hoverable
              onClick={() => navigate(entity.path)}
              style={{
                height: '220px',
                border: 'none',
                borderRadius: 16,
                background: entity.bg,
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              bodyStyle={{ padding: 0 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              {entity.icon}
              <Title level={4} style={{ color: '#fff', marginTop: 14, fontWeight: 500 }}>
                {entity.name}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
