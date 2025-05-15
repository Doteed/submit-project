import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../../store/taskContext";
import dayjs from "dayjs";

const TaskForm = () => {
  const { addTask, updateTask, tasks } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const existingTask = tasks.find((task) => task.id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: "12:00",
    priority: "normal",
    category: "업무",
    tags: [],
  });

  useEffect(() => {
    if (isEdit && existingTask) {
      setFormData({
        ...existingTask,
        date: existingTask.date,
        time: existingTask.time,
      });
    }
  }, [isEdit, existingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.time) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    const formattedData = {
      ...formData,
    };

    if (isEdit) {
      await updateTask(id, formattedData);
    } else {
      await addTask(formattedData);
    }
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? "일정 수정" : "일정 추가"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700 mb-1">제목 *</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">설명</label>
          <textarea
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">날짜 *</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">시간 *</label>
          <input
            type="time"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">우선순위</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="high">높음</option>
            <option value="normal">보통</option>
            <option value="low">낮음</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">카테고리</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="업무">업무</option>
            <option value="개인">개인</option>
            <option value="운동">운동</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            태그 (쉼표로 구분하여 입력)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 중요, 긴급"
            value={formData.tags.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition"
          >
            {isEdit ? "일정 수정" : "일정 추가"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;