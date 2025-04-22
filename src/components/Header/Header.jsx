import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Layout, Typography, Space, Button } from "antd";

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const Header = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || "");
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("로그아웃 실패: " + error.message);
    }
  };

  return (
    <AntHeader style={{ backgroundColor: "#eaeaea", padding: "0 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space>
          <Title level={4} style={{ margin: 0 }}>나의 일정 관리</Title>
          {userEmail && <Text type="secondary">{userEmail}</Text>}
        </Space>
        <Button type="link" danger onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </AntHeader>
  );
};

export default Header;
