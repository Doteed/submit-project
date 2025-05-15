# 📆 스마트 일정관리 프로젝트

React.js와 Firebase 기반의 일정 관리 웹 애플리케이션입니다.  
일정 등록 및 수정, 태그/우선순위 필터, 캘린더 뷰, 사용자 인증까지 지원하며,  
**Tailwind CSS** 기반의 **미니멀 & 볼드** 스타일 UI로 구성되어 있습니다.

---

## 🛠 사용 기술

- **React.js 18**
- **Firebase Authentication + Firestore**
- **Tailwind CSS**
- **React Router v6**
- **Day.js (날짜 처리)**
- **React Calendar**
- **Ant Design 일부 컴포넌트 사용**

---

## ✨ 주요 기능

- 🔐 **Firebase 이메일 로그인/회원가입**
- 📝 **일정 등록/수정/삭제 (CRUD)**
- 🗓️ **캘린더 기반 일정 조회**
- 📌 **우선순위 필터 및 정렬**
- 🧠 **카테고리/태그 필터**
- 🔎 **오늘의 일정 하이라이트**
- 🧼 **로그인 여부에 따라 조건부 UI 표시**
- ✅ **반응형 Tailwind UI 적용**

---

## 🚀 실행 방법

1. 패키지 설치
```bash
npm install
```

2. Firebase 설정  
`src/firebase.js` 생성 후 다음 형식으로 Firebase 설정 추가:

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

3. 개발 서버 실행
```bash
npm start
```

---

## 📁 프로젝트 구조

```
src/
├── components/        # 재사용 UI 컴포넌트 (Header, Footer, TaskForm 등)
├── layout/            # AppLayout 레이아웃 컴포넌트
├── pages/             # 라우트 페이지 (Main, Home, Calendar, Login, Signup 등)
├── store/             # Context API 및 Firebase 연동
├── firebase.js        # Firebase 초기화
└── index.jsx          # 진입 파일
```

---

## 🔍 주요 컴포넌트 소개

| 컴포넌트 | 설명 |
|----------|------|
| `TaskForm` | 일정 생성 및 수정 폼 |
| `FilterBar` | 텍스트/카테고리/우선순위 필터링 |
| `TaskList` | 일정 목록 표시 |
| `CalendarPage` | 달력 UI와 연동된 일정 조회 |
| `LoginPage` / `SignupPage` | Firebase 인증 연동 |
| `AppLayout` | Header, Footer 포함 전체 레이아웃 |

---

## 👤 개발자

- 이름: 정병국  
- 용도: 프론트엔드 기술 과제 제출용
