import React from "react";
import { Input, Button, Select, Checkbox, Space } from "antd";

const { Option } = Select;

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
    <Space
      direction="horizontal"
      size={[8, 12]}
      wrap
      style={{ marginBottom: 16 }}
    >
      <Input
        placeholder="일정 제목 검색"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ width: 240 }}
      />

      <Button
        type={dateFilter === "오늘" ? "primary" : "default"}
        onClick={() => setDateFilter("오늘")}
      >
        오늘
      </Button>
      <Button
        type={dateFilter === "이번주" ? "primary" : "default"}
        onClick={() => setDateFilter("이번주")}
      >
        이번주
      </Button>
      <Button
        type={dateFilter === "전체" ? "primary" : "default"}
        onClick={() => setDateFilter("전체")}
      >
        전체
      </Button>

      <Select
        value={categoryFilter}
        onChange={(value) => setCategoryFilter(value)}
        style={{ width: 160 }}
      >
        <Option value="전체">전체 카테고리</Option>
        <Option value="업무">업무</Option>
        <Option value="개인">개인</Option>
        <Option value="운동">운동</Option>
      </Select>

      <Checkbox
        checked={sortByPriority}
        onChange={(e) => setSortByPriority(e.target.checked)}
      >
        우선순위 정렬
      </Checkbox>
    </Space>
  );
};

export default FilterBar;
