import React from "react";

const FilterBar = ({
  filterText,
  setFilterText,
  dateFilter,
  setDateFilter,
  sortByPriority,
  setSortByPriority,
  categoryFilter,
  setCategoryFilter,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <input
        type="text"
        placeholder="일정 제목 검색"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-60 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2">
        {["오늘", "이번주", "전체"].map((label) => (
          <button
            key={label}
            onClick={() => setDateFilter(label)}
            className={`px-4 py-2 rounded-md font-medium text-sm transition ${
              dateFilter === label
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-40 px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="전체">전체 카테고리</option>
        <option value="업무">업무</option>
        <option value="개인">개인</option>
        <option value="운동">운동</option>
      </select>

      <label className="inline-flex items-center space-x-2 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          checked={sortByPriority}
          onChange={(e) => setSortByPriority(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span>우선순위 정렬</span>
      </label>
    </div>
  );
};

export default FilterBar;
