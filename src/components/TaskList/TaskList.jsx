import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../../store/taskContext";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Empty } from "antd";

dayjs.extend(isBetween);

const TaskList = ({ filterText, dateFilter, sortByPriority, categoryFilter, tagFilter }) => {
  const { tasks } = useTasks();

  let filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filterText.toLowerCase())
  );

  if (dateFilter === "오늘") {
    const today = dayjs().format("YYYY-MM-DD");
    filteredTasks = filteredTasks.filter((task) => task.date === today);
  } else if (dateFilter === "이번주") {
    const start = dayjs().startOf("week");
    const end = dayjs().endOf("week");
    filteredTasks = filteredTasks.filter((task) =>
      dayjs(task.date).isBetween(start, end, null, "[]")
    );
  }

  if (categoryFilter !== "전체") {
    filteredTasks = filteredTasks.filter((task) => task.category === categoryFilter);
  }

  if (tagFilter) {
    const normalizedTag = tagFilter.toLowerCase().replace("#", "");
    filteredTasks = filteredTasks.filter((task) =>
      task.tags?.some((tag) => tag.toLowerCase().includes(normalizedTag))
    );
  }

  if (sortByPriority) {
    const priorityMap = { high: 1, normal: 2, low: 3 };
    filteredTasks.sort(
      (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <Empty description="일정이 없습니다." />
      )}
    </div>
  );
};

export default TaskList;
