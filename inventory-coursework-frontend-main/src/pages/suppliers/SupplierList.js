import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Typography, Space, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { getSuppliers, deleteSupplier } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const { data } = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      message.error('Failed to fetch suppliers');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      message.success('Supplier deleted');
      fetchSuppliers();
    } catch {
      message.error('Failed to delete supplier');
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Contact Person', dataIndex: 'contactPerson', key: 'contactPerson' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Actions',
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate(`/suppliers/edit/${record.id}`)}
          />
          <Popconfirm
            title="Delete supplier?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
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
              <TeamOutlined style={{ marginRight: 8, color: '#1890ff' }} />
              Suppliers
            </Title>
          </Space>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/suppliers/new')}
          >
            Add Supplier
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={suppliers}
          rowKey="id"
          loading={loading}
          bordered
          pagination={{ pageSize: 6 }}
          scroll={{ x: 'max-content' }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          style={{ background: '#fff' }}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{
                    backgroundColor: '#f0f2f5',
                    fontWeight: 'bold',
                    color: '#000',
                    padding: '12px 8px',
                    textAlign: props.align || 'left',
                  }}
                />
              ),
            },
          }}
        />
      </Card>

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
    </div>
  );
}

export default SupplierList;
