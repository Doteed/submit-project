import React from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import PageHeader from "../components/Header/PageHeader";
import AppLayout from "../layout/AppLayout";

const AddEditPage = () => {
  return (
    <AppLayout pageHeader={<PageHeader title="일정 추가 / 수정" />}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          일정 추가 / 수정
        </h2>
        <TaskForm />
      </div>
    </AppLayout>
  );
};

export default AddEditPage;
