import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useTasks } from "../store/taskContext";
import dayjs from "dayjs";
import AppLayout from "../layout/AppLayout";
import FilterBar from "../components/FilterBar/FilterBar";
import TaskList from "../components/TaskList/TaskList";

const MainPage = () => {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const [user, setUser] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [dateFilter, setDateFilter] = useState("오늘");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const today = dayjs().format("YYYY-MM-DD");
    const filtered = tasks.filter((task) => task.date === today);
    setTodayTasks(filtered);

    return () => unsub();
  }, [tasks]);

  return (
    <AppLayout>
      <section className="w-full py-16 border-b border-gray-300 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold tracking-tight mb-4">🗓️ 스마트 일정관리</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            오늘의 일정을 정리하고, 인생을 계획해 보세요. <br /> 진짜 중요한 하루가 시작됩니다.
          </p>
          <button
            onClick={() => navigate(user ? "/add" : "/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            {user ? "일정 등록하기" : "로그인하고 시작하기"}
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-20 border-b border-gray-300">
        {user ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
              오늘의 일정 <span className="text-blue-600">({todayTasks.length})</span>
            </h2>

            {todayTasks.length > 0 ? (
              <ul className="space-y-4">
                {todayTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md px-4 py-3"
                  >
                    <div className="text-gray-800 font-medium">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.date}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">오늘은 아직 등록된 일정이 없습니다.</p>
            )}

            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-700">전체 일정 보기</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
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
              </div>
              <TaskList
                filterText={filterText}
                dateFilter={dateFilter}
                sortByPriority={sortByPriority}
                categoryFilter={categoryFilter}
                tagFilter={tagFilter}
              />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-24 text-lg bg-white rounded-xl shadow-inner">
            로그인 시 일정 목록이 표시됩니다.
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">스마트 일정관리 주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold mb-2 text-lg">캘린더 보기</h3>
            <p className="text-sm text-gray-600">전체 일정을 한눈에 확인할 수 있는 월간 달력 지원</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold mb-2 text-lg">일정 추가</h3>
            <p className="text-sm text-gray-600">우선순위, 카테고리, 시간 등을 지정해 일정 관리</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold mb-2 text-lg">간편 로그인</h3>
            <p className="text-sm text-gray-600">Firebase로 빠르고 안전하게 인증 및 사용자 관리</p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default MainPage;