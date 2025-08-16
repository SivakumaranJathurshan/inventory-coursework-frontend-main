import React from "react";
import { Layout as AntLayout, Button, Typography } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import {
  LogoutOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = AntLayout;
const { Title, Text } = Typography;

export default function Layout({ userName, onLogout }) {
  const navigate = useNavigate();

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: "10px",
          padding: "0 16px",
        }}
      >
        <Title
          level={4}
          style={{
            color: "white",
            margin: 0,
            cursor: "pointer",
            flex: "1 1 auto",
            minWidth: "200px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={() => navigate("/")}
        >
          <AppstoreOutlined /> Inventory Management
        </Title>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <Text
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <UserOutlined /> Welcome, {userName}
          </Text>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={onLogout}
            style={{
              borderRadius: "20px",
              padding: "0 16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#ff4d4f",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            Logout
          </Button>
        </div>
      </Header>

      <Content style={{ padding: "16px" }}>
        <Outlet />
      </Content>

      <Footer
        style={{ textAlign: "center", fontSize: "14px", padding: "10px" }}
      >
        Inventory Management System ©2025
      </Footer>
    </AntLayout>
  );
}
