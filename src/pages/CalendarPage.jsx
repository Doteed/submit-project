import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks } from "../store/taskContext";
import dayjs from "dayjs";
import PageHeader from "../components/Header/PageHeader";
import AppLayout from "../layout/AppLayout";

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
    return hasTask ? (
      <div className="text-red-500 text-xs text-center mt-1">●</div>
    ) : null;
  };

  const handleDateClick = (value) => {
    setSelectedDate(dayjs(value).format("YYYY-MM-DD"));
  };

  const tasksForSelectedDate = tasks.filter(
    (task) => task.date === selectedDate
  );

  return (
    <AppLayout pageHeader={<PageHeader title="캘린더 보기" />}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 캘린더 보기</h2>

        <div className="bg-white shadow-md rounded-lg border border-gray-200 p-4">
          <Calendar
            onClickDay={handleDateClick}
            tileContent={tileContent}
            value={selectedDate ? new Date(selectedDate) : new Date()}
            className="react-calendar w-full"
          />
        </div>

        {selectedDate && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {selectedDate} 일정
            </h3>

            {tasksForSelectedDate.length > 0 ? (
              <ul className="space-y-3">
                {tasksForSelectedDate.map((task) => (
                  <li
                    key={task.id}
                    className="bg-white shadow-sm border border-gray-200 rounded-md p-4"
                  >
                    <p className="text-gray-900 font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {task.category} | {task.priority}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 py-6 bg-white border rounded-md mt-4">
                해당 날짜에 일정이 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
