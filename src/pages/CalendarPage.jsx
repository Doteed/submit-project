import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks } from "../store/taskContext";
import dayjs from "dayjs";
import PageHeader from "../components/Header/PageHeader";
import { Layout, Typography, Card, List, Empty } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

const CalendarPage = () => {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    setSelectedDate(today);
  }, []);

  const tileContent = ({ date }) => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    const hasTask = tasks.some((task) => task.date === dateString);
    return hasTask ? <div style={{ fontSize: 10, color: "red", textAlign: "center" }}>●</div> : null;
  };

  const handleDateClick = (value) => {
    setSelectedDate(dayjs(value).format("YYYY-MM-DD"));
  };

  const tasksForSelectedDate = tasks.filter((task) => task.date === selectedDate);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Content>
        <PageHeader title="캘린더 보기" />
        <Card style={{ margin: "30px auto 0", maxWidth: 600 }}>
          <Title level={3} style={{ marginBottom: 24 }}>📅 캘린더 보기</Title>

          <Calendar
            onClickDay={handleDateClick}
            tileContent={tileContent}
            value={selectedDate ? new Date(selectedDate) : new Date()}
          />

          {selectedDate && (
            <div style={{ marginTop: 24 }}>
              <Title level={4}>{selectedDate} 일정</Title>
              {tasksForSelectedDate.length > 0 ? (
                <List
                  itemLayout="vertical"
                  dataSource={tasksForSelectedDate}
                  renderItem={(task) => (
                    <List.Item key={task.id}>
                      <Card>
                        <Text strong>{task.title}</Text>
                        <br />
                        <Text type="secondary">
                          {task.category} | {task.priority}
                        </Text>
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="해당 날짜에 일정이 없습니다." />
              )}
            </div>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default CalendarPage;
