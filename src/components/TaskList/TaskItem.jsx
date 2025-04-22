import React from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../store/taskContext";
import { Card, Typography, Button, Space } from "antd";

const { Text } = Typography;

const TaskItem = ({ task }) => {
  const { deleteTask } = useTasks();
  const navigate = useNavigate();

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text>{task.title}</Text>
        <Space>
          <Button type="link" size="small" onClick={() => navigate(`/edit/${task.id}`)}>
            수정
          </Button>
          <Button type="link" danger size="small" onClick={() => deleteTask(task.id)}>
            삭제
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default TaskItem;
