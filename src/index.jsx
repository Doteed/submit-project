import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddEditPage from "./pages/AddEditPage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { TaskProvider } from "./store/taskContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./index.css";

const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (!user) navigate("/login");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="text-center p-8">로딩 중...</div>;
  return isAuthenticated ? element : null;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
      <Route path="/add" element={<PrivateRoute element={<AddEditPage />} />} />
      <Route path="/edit/:id" element={<PrivateRoute element={<AddEditPage />} />} />
      <Route path="/calendar" element={<PrivateRoute element={<CalendarPage />} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TaskProvider>
  </React.StrictMode>
);
