import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../../store/taskContext";
import dayjs from "dayjs";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Button,
  Card,
} from "antd";

const { Option } = Select;

const TaskForm = () => {
  const { addTask, updateTask, tasks } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const existingTask = tasks.find((task) => task.id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: dayjs(),
    time: dayjs("12:00", "HH:mm"),
    priority: "normal",
    category: "업무",
    tags: [],
  });

  useEffect(() => {
    if (isEdit && existingTask) {
      setFormData({
        ...existingTask,
        date: dayjs(existingTask.date),
        time: dayjs(existingTask.time, "HH:mm"),
      });
    }
  }, [isEdit, existingTask]);

  const handleSubmit = async () => {
    const formattedData = {
      ...formData,
      date: formData.date.format("YYYY-MM-DD"),
      time: formData.time.format("HH:mm"),
    };

    if (isEdit) {
      await updateTask(id, formattedData);
    } else {
      await addTask(formattedData);
    }
    navigate("/");
  };

  return (
    <Card>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="제목" required>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </Form.Item>

        <Form.Item label="설명">
          <Input.TextArea
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </Form.Item>

        <Form.Item label="날짜" required>
          <DatePicker
            style={{ width: "100%" }}
            value={formData.date}
            onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
          />
        </Form.Item>

        <Form.Item label="시간" required>
          <TimePicker
            style={{ width: "100%" }}
            format="HH:mm"
            value={formData.time}
            onChange={(time) => setFormData((prev) => ({ ...prev, time }))}
          />
        </Form.Item>

        <Form.Item label="우선순위">
          <Select
            value={formData.priority}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, priority: value }))
            }
          >
            <Option value="high">높음</Option>
            <Option value="normal">보통</Option>
            <Option value="low">낮음</Option>
          </Select>
        </Form.Item>

        <Form.Item label="카테고리">
          <Select
            value={formData.category}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <Option value="업무">업무</Option>
            <Option value="개인">개인</Option>
            <Option value="운동">운동</Option>
          </Select>
        </Form.Item>

        <Form.Item label="태그(입력하여 추가가능)">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="태그 입력 (예: 업무, 중요)"
            value={formData.tags}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, tags: value }))
            }
            options={[
              { value: "업무" },
              { value: "중요" },
              { value: "운동" },
              { value: "개인" },
              { value: "긴급" },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {isEdit ? "일정 수정" : "일정 추가"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
