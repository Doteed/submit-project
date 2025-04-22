# 📆 일정 관리 앱

React.js와 Firebase, Ant Design을 활용한 일정 관리 웹 애플리케이션입니다.  
할 일(To-Do)과 캘린더 기반 일정 확인, 우선순위 설정, 사용자 인증 등을 지원합니다.

---

## 🛠 사용 기술

- **React.js 18**
- **Ant Design 5 (v4 이상 충족)**
- **Firebase Auth + Firestore**
- React Router v6
- Day.js (날짜 처리)
- React Calendar

---

## ✨ 주요 기능

- 🔐 **Firebase 이메일 로그인/회원가입**
- 📝 **일정 등록/수정/삭제 (CRUD)**
- 🗓️ **캘린더 기반 일정 조회**
- 📌 **우선순위 필터 및 정렬**
- 🧠 **카테고리/태그 필터**
- 👤 **사용자별 데이터 분리 저장**
- ✅ **Ant Design UI 적용**

---

## 🚀 실행 방법

1. 의존성 설치

npm install

2. 환경 설정 (firebase.js)
src/firebase.js 파일생성 후 본인 firebaseConfig 값 설정

3. 개발 서버 실행
npm start

🧩 주요 컴포넌트 소개
컴포넌트 | 설명
TaskForm | 일정 생성/수정 폼. antd의 Form, Input, DatePicker, Select 사용
FilterBar | 텍스트/카테고리/우선순위 필터링 UI 구성. Input, Select, Button, Checkbox 사용
TaskList | 일정 목록 필터링 후 표시. antd의 List와 Card 조합
CalendarPage | react-calendar과 연동하여 날짜별 일정 표시
LoginPage, SignupPage | Firebase 인증 연동. antd의 Form, Input, Card 사용

📁 프로젝트 구조
src/
├── components/        # 재사용 컴포넌트들 (Header, TaskForm, FilterBar, ...)
├── pages/             # 라우트 페이지들 (Home, Calendar, Login, Signup)
├── store/             # 상태관리 (Firebase 연동 포함)
├── firebase.js        # Firebase 설정 파일
└── index.jsx          # 진입 파일

🧑‍💻 개발자
이름: 정병국

이 프로젝트는 프론트엔드 과제 제출용으로 제작되었습니다.