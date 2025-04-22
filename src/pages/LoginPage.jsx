import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Form, Input, Button, Typography, Card, Layout } from "antd";

const { Text, Title } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: 360 }}>
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            로그인
          </Title>
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="이메일"
              name="email"
              rules={[{ required: true, message: "이메일을 입력해주세요." }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                로그인
              </Button>
            </Form.Item>
          </Form>

          <Text style={{ display: "block", textAlign: "center" }}>
            계정이 없으신가요?{" "}
            <Text
              type="link"
              onClick={() => navigate("/signup")}
              style={{ color: "#1890ff", cursor: "pointer" }}
            >
              회원가입
            </Text>
          </Text>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
