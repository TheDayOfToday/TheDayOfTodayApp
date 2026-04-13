# TheDayOfToday — 프로젝트 개요

## 프로젝트 소개

**오늘의 하루(TheDayOfToday)** 는 AI 기반 감정 분석 모바일 앱이다.
사용자가 음성으로 일기를 기록하면, AI가 감정을 분석하고 피드백을 제공한다.
React Native + Expo 기반의 프론트엔드 프로젝트이며, Android 우선 빌드 환경이다.

---

## 기술 스택

React Native + Expo (SDK 52) + TypeScript + Expo Router (파일 기반 라우팅)

### 주요 패키지
- **서버 상태 관리**: `@tanstack/react-query`
- **HTTP 클라이언트**: `axios` + 자체 `APIClient` 클래스
- **인증 토큰 저장**: `expo-secure-store`
- **자동 로그인 플래그**: `@react-native-async-storage/async-storage`
- **음성 녹음**: `expo-av`
- **파일 업로드**: `expo-file-system` (multipart)
- **애니메이션**: `lottie-react-native`
- **폰트 크기**: `react-native-responsive-fontsize` (RFValue 사용)
- **바텀시트**: `@gorhom/bottom-sheet`
- **캘린더**: `react-native-calendars`
- **토스트**: `react-native-toast-message`

---

## 폴더 구조

- `app/` — Expo Router 라우트. `_layout.tsx`(루트), `(tabs)/`(하단 탭), `recording/`(녹음 플로우), `setting/`, `edit-password/`
- `src/components/common/` — 공용 컴포넌트 (폴더/index.tsx 구조)
- `src/hooks/` — 커스텀 훅
- `src/queries/` — TanStack Query 훅 (`useXxxQuery.ts`)
- `src/service/` — API 서비스 레이어. 도메인별 폴더(`auth/`, `book/`, `diary/`, `record/`, `weekly/`)
- `src/interface/key/queryKey.ts` — React Query 키 상수
- `src/styles/` — StyleSheet 파일 (화면/컴포넌트별 분리)
- `assets/` — 폰트, 이미지, Lottie JSON
- `app.config.ts` — Expo 설정 (dotenv 사용)

---

## 아키텍처 핵심 패턴

### 1. APIClient (싱글턴 클래스)
`src/service/index.ts`의 `APIClient`는 모든 HTTP 요청의 진입점이다.

```ts
// 사용 예시
APIClient.of(SomeAPIClass)(arg1, arg2)
```

- 각 도메인 API는 `APIRequest<ResponseType>`을 구현하는 클래스로 정의
- `APIClient.of()`로 클래스를 callable 함수로 변환
- Authorization 헤더는 `request.authorization` 필드로 주입

### 2. 서비스 레이어 구조
도메인별 폴더(`src/service/<domain>/`) 구성:
- `index.ts`: API 함수 정의 (`APIClient.of(XxxAPI)(...)` 형태)
- `type.ts`: 해당 도메인의 요청/응답 타입

### 3. 인증 흐름
- `accessToken`: `AsyncStorage`에 저장 (자동 로그인 여부 포함)
- 실제 토큰 값: `expo-secure-store` 사용 (`useToken` 훅)
- 앱 시작 시 `app/_layout.tsx`에서 인증 상태 확인 후 라우팅 분기

---

## 환경 변수

`app.config.ts`에서 `dotenv/config`를 통해 주입.

```
API_BASE_URL  — 백엔드 서버 기본 URL
```

접근: `Constants.expoConfig?.extra?.API_BASE_URL`

---

## 참고 사항

- Android 패키지명: `com.thedayoftoday.app`
- 코드 컨벤션·린트 규칙: `.claude/rules/conventions-and-lint.md` 참고
