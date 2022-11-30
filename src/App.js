import "./App.css";
import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Login from "./components/login";
import Posts from "./components/content";
const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Layout style={{ height: "calc(100vh-200px)", background: "white" }}>
          <Header>
            <div style={{ color: "white" }}>Refactor Academy</div>
            <div style={{ position: "absolute", top: "1px", right: "20px" }}>
              <Login />
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
            }}
          >
            <div className="site-layout-background">
              <Posts />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              position: "fixed",
              bottom: 0,
              width: "100vw",
            }}
          >
            Refactor Academy ©2022 Created by SAAK
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
