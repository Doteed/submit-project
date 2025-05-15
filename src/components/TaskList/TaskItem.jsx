import React from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../store/taskContext";

const TaskItem = ({ task }) => {
  const { deleteTask } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition mb-4">
      <div className="flex-1">
        <p className="text-gray-900 font-semibold text-base">{task.title}</p>
        <p className="text-sm text-gray-500 mt-1">{task.category} | {task.priority}</p>
      </div>

      <div className="flex-shrink-0 flex gap-2 ml-4">
        <button
          onClick={() => navigate(`/edit/${task.id}`)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
        >
          수정
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-600 hover:text-red-800 text-sm font-medium transition"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
