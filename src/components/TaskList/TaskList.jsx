import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../../store/taskContext";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const TaskList = ({
  filterText,
  dateFilter,
  sortByPriority,
  categoryFilter,
  tagFilter,
}) => {
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
    filteredTasks = filteredTasks.filter(
      (task) => task.category === categoryFilter
    );
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
    <div className="flex flex-col gap-4 mt-6">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <div className="text-center text-gray-500 py-12 rounded-lg border border-dashed bg-gray-50">
          현재 조건에 해당하는 일정이 없습니다.
        </div>
      )}
    </div>
  );
};

export default TaskList;
