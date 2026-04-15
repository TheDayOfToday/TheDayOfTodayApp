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
### 1. 서비스 레이어 구조
도메인별 폴더(`src/service/<domain>/`) 구성:
- `index.ts`: API 함수 정의 (`APIClient.of(XxxAPI)(...)` 형태)
- `type.ts`: 해당 도메인의 요청/응답 타입

## 참고 사항
- 코드 컨벤션·린트 규칙: `.claude/rules/conventions-and-lint.md` 참고
