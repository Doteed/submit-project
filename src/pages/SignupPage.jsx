import React from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Form, Input, Button, Typography, Card, Layout } from "antd";

const { Text, Title } = Typography;
const { Content } = Layout;

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    const { email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패: " + error.message);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: 360 }}>
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            회원가입
          </Title>
          <Form layout="vertical" onFinish={handleSignup}>
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

            <Form.Item
              label="비밀번호 확인"
              name="confirmPassword"
              rules={[{ required: true, message: "비밀번호 확인을 입력해주세요." }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                가입하기
              </Button>
            </Form.Item>
          </Form>

          <Text style={{ display: "block", textAlign: "center" }}>
            이미 계정이 있으신가요?{" "}
            <Text
              type="link"
              onClick={() => navigate("/login")}
              style={{ color: "#1890ff", cursor: "pointer" }}
            >
              로그인
            </Text>
          </Text>
        </Card>
      </Content>
    </Layout>
  );
};

export default SignupPage;
