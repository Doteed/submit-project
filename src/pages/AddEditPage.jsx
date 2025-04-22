import React from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import PageHeader from "../components/Header/PageHeader";
import { Layout, Typography, Card } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const AddEditPage = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content>
        <PageHeader title="일정 추가 / 수정" />
        <Card style={{ margin: "30px auto 0", maxWidth: 600 }}>
          <Title level={3} style={{ marginBottom: 24 }}>
            일정 추가 / 수정
          </Title>
          <TaskForm />
        </Card>
      </Content>
    </Layout>
  );
};

export default AddEditPage;
