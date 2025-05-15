import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import FilterBar from "../components/FilterBar/FilterBar";
import TaskList from "../components/TaskList/TaskList";
import { PlusOutlined, CalendarOutlined } from "@ant-design/icons";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../store/taskContext";
import dayjs from "dayjs";

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
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {todayTasks.length > 0 && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-md p-4 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              오늘의 일정 ({todayTasks.length})
            </h2>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
              {todayTasks.map((task) => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          </div>
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

        <div className="mb-4">
          <input
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            placeholder="태그로 필터링 (예: #업무)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <TaskList
          filterText={filterText}
          dateFilter={dateFilter}
          sortByPriority={sortByPriority}
          categoryFilter={categoryFilter}
          tagFilter={tagFilter}
        />
      </main>

      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        <FloatingButton
          icon={<PlusOutlined style={{ fontSize: 20 }} />}
          type="primary"
          onClick={() => navigate("/add")}
          tooltip="일정 추가"
        />
        <FloatingButton
          icon={<CalendarOutlined style={{ fontSize: 20 }} />}
          onClick={() => navigate("/calendar")}
          tooltip="캘린더 보기"
        />
      </div>
    </div>
  );
};

export default HomePage;
