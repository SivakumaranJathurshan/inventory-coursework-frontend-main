import React, { useState } from 'react';
import { Form, InputNumber, Button, message, Input } from 'antd';
import API from '../../services/api';
import ProductSelectorModal from '../../components/ProductSelectorModal';

const InventoryForm = () => {
  const [form] = Form.useForm();
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const openProductModal = () => setProductModalVisible(true);
  const closeProductModal = () => setProductModalVisible(false);

  const onProductSelect = (product) => {
    setSelectedProduct(product);
    form.setFieldsValue({ productId: product.id });
    closeProductModal();
  };

  const onFinish = async (values) => {
    if (!selectedProduct) {
      message.error('Please select a product');
      return;
    }

    const payload = {
      productId: values.productId,
      quantity: values.quantity,
      minimumStock: values.minimumStock,
      maximumStock: values.maximumStock,
    };

    setLoading(true);
    try {
      await API.post('/inventory', payload);
      message.success('Inventory item created successfully');
      form.resetFields();
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
      message.error('Failed to create inventory item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          quantity: 0,
          minimumStock: 0,
          maximumStock: 0,
        }}
      >
        {/* Hidden productId field */}
        <Form.Item name="productId" style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>

        {/* Show selected product name with button to open modal */}
        <Form.Item label="Product" rules={[{ required: true, message: 'Please select a product' }]}>
          <Input
            readOnly
            placeholder="Select a product"
            value={selectedProduct ? selectedProduct.name : ''}
            onClick={openProductModal}
            style={{ cursor: 'pointer' }}
          />
        </Form.Item>

        <Form.Item label="Quantity" name="quantity" rules={[{ required: true, type: 'number', min: 0 }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Minimum Stock" name="minimumStock" rules={[{ required: true, type: 'number', min: 0 }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Maximum Stock" name="maximumStock" rules={[{ required: true, type: 'number', min: 0 }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Inventory Item
          </Button>
        </Form.Item>
      </Form>

      <ProductSelectorModal
        visible={productModalVisible}
        onSelect={onProductSelect}
        onCancel={closeProductModal}
      />
    </>
  );
};

export default InventoryForm;
