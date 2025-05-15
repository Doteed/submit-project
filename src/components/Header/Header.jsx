import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || "");
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("로그아웃 실패: " + error.message);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">스마트 일정관리</h1>
          {userEmail && (
            <p className="text-sm text-gray-500 mt-1">{userEmail}</p>
          )}
        </div>

        <div>
          {userEmail ? (
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium transition"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
