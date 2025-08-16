import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import InventoryForm from './InventoryForm';
import inventoryService from '../../services/inventoryService';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await inventoryService.getInventory();
      setInventory(res.data);
    } catch (error) {
      message.error('Failed to load inventory');
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const openEditModal = (item) => {
    setEditItem(item);
    setModalVisible(true);
  };

  const openCreateModal = () => {
    setEditItem(null);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this inventory item?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await inventoryService.deleteInventoryItem(id);
          message.success('Inventory deleted');
          fetchInventory();
        } catch (error) {
          message.error('Failed to delete inventory');
          console.error(error);
        }
      },
    });
  };

  const handleSave = () => {
    setModalVisible(false);
    fetchInventory();
  };

  return (
    <>
      <Button type="primary" onClick={openCreateModal} style={{ marginBottom: 16 }}>
        Add Inventory Item
      </Button>
      <Table
        dataSource={inventory}
        rowKey="id"
        loading={loading}
        columns={[
          {
            title: 'Product',
            dataIndex: ['product', 'name'],
            key: 'product',
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
          },
          {
            title: 'Min Stock',
            dataIndex: 'minimumStock',
            key: 'minimumStock',
          },
          {
            title: 'Max Stock',
            dataIndex: 'maximumStock',
            key: 'maximumStock',
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Space>
                <Button onClick={() => openEditModal(record)}>Edit</Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        visible={modalVisible}
        title={editItem ? 'Edit Inventory Item' : 'Add Inventory Item'}
        footer={null}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <InventoryForm
          initialData={editItem}
          onSave={handleSave}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </>
  );
};

export default InventoryList;
