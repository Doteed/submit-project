import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // 로그인한 사용자의 일정 불러오기
  const loadTasks = async (user) => {
    try {
      const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log("⚠ 불러올 일정 없음");
      }

      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    } catch (error) {
      console.error("📛 일정 불러오기 실패:", error);
    }
  };

  // 일정 추가
  const addTask = async (taskData) => {
    const user = auth.currentUser;
    if (!user) {
      console.warn("⚠ 로그인 상태 아님, task 저장 차단됨");
      return;
    }

    const newTask = {
      ...taskData,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      setTasks((prev) => [...prev, { id: docRef.id, ...newTask }]);
    } catch (error) {
      console.error("📛 일정 추가 실패:", error);
    }
  };

  // 일정 삭제
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("📛 일정 삭제 실패:", error);
    }
  };

  // 일정 수정
  const updateTask = async (taskId, updatedData) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), updatedData);
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, ...updatedData } : task))
      );
    } catch (error) {
      console.error("📛 일정 수정 실패:", error);
    }
  };

  // 인증 상태가 준비되면 loadTasks 호출
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ 로그인 사용자 감지:", user.uid);
        loadTasks(user);
      } else {
        console.log("🔒 로그인 사용자 없음");
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
