import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Typography, Layout } from "antd";

const { Title } = Typography;
const { Header: AntHeader } = Layout;

const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <AntHeader style={{ backgroundColor: "#eaeaea", padding: "0 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate(-1)}
          style={{ marginRight: 16 }}
        />
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
      </div>
    </AntHeader>
  );
};

export default PageHeader;
