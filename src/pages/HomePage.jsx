import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import FilterBar from "../components/FilterBar/FilterBar";
import TaskList from "../components/TaskList/TaskList";
import { PlusOutlined, CalendarOutlined  } from "@ant-design/icons";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../store/taskContext";
import dayjs from "dayjs";
import { Layout, Input, Typography, Card, List, FloatButton } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [dateFilter, setDateFilter] = useState("전체");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [tagFilter, setTagFilter] = useState("");
  const { tasks } = useTasks();
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const filtered = tasks.filter((task) => task.date === today);
    setTodayTasks(filtered);
  }, [tasks]);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Header />
      <Content style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
        {todayTasks.length > 0 && (
          <Card
            style={{ marginBottom: 24, backgroundColor: "#fff8db", borderColor: "#ffe58f" }}
            size="small"
          >
            <Title level={4} style={{ margin: 0 }}>오늘의 일정 ({todayTasks.length})</Title>
            <List
              size="small"
              dataSource={todayTasks}
              renderItem={(task) => <List.Item>{task.title}</List.Item>}
            />
          </Card>
        )}

        <FilterBar
          filterText={filterText}
          setFilterText={setFilterText}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          sortByPriority={sortByPriority}
          setSortByPriority={setSortByPriority}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
        />

        <div style={{ marginBottom: 16 }}>
          <Input
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            placeholder="태그로 필터링 (예: #업무)"
          />
        </div>

        <TaskList
          filterText={filterText}
          dateFilter={dateFilter}
          sortByPriority={sortByPriority}
          categoryFilter={categoryFilter}
          tagFilter={tagFilter}
        />
      </Content>

      <FloatButton.Group shape="circle">
        <FloatingButton icon={<PlusOutlined />} type="primary" onClick={() => navigate("/add")} tooltip="일정 추가" />
        <FloatingButton icon={<CalendarOutlined />} onClick={() => navigate("/calendar")} tooltip="캘린더 보기" />
      </FloatButton.Group>

    </Layout>
  );
};

export default HomePage;
