# TheDayOfToday — 프로젝트 개요

## 프로젝트 소개

**오늘의 하루(TheDayOfToday)** 는 AI 기반 감정 분석 모바일 앱이다.  
사용자가 음성으로 일기를 기록하면, AI가 감정을 분석하고 피드백을 제공한다.  
React Native + Expo 기반의 프론트엔드 프로젝트이며, Android 우선 빌드 환경이다.

---

## 기술 스택

| 항목 | 버전 |
|------|------|
| React Native | 0.76.6 |
| Expo SDK | ~52.0.27 |
| Expo Router | ~4.0.17 |
| TypeScript | ^5.3.3 |
| TanStack React Query | ^5.74.0 |
| Axios | ^1.8.4 |
| React Native Reanimated | ~3.16.1 |

### 주요 패키지
- **라우팅**: `expo-router` (파일 기반 라우팅)
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

```
TheDayOfTodayApp/
├── app/                        # Expo Router 라우트 (화면 단위)
│   ├── _layout.tsx             # 루트 레이아웃 (QueryClientProvider, Toast, 폰트 로드, 인증 분기)
│   ├── splash.tsx              # 스플래시 화면
│   ├── signIn.tsx              # 로그인
│   ├── signUp.tsx              # 회원가입
│   ├── (tabs)/                 # 하단 탭 네비게이션
│   │   ├── _layout.tsx
│   │   ├── index.tsx           # 캘린더(홈) 탭
│   │   ├── record.tsx          # 녹음 진입 탭
│   │   └── analysis.tsx        # 분석 탭
│   ├── recording/              # 녹음 플로우 (모놀로그 / 대화 모드)
│   │   ├── index.tsx           # 녹음 모드 선택
│   │   ├── monologue.tsx       # 혼잣말 모드 녹음
│   │   ├── conversation.tsx    # 대화 모드 녹음
│   │   ├── result.tsx          # 녹음 결과
│   │   └── daily-analysis.tsx  # 일별 감정 분석 결과
│   ├── setting/                # 설정
│   └── edit-password/          # 비밀번호 변경
│
├── src/
│   ├── components/
│   │   └── common/             # 공용 컴포넌트 (폴더/index.tsx 구조)
│   │       ├── Book/
│   │       ├── CustomToast/
│   │       ├── Loading/
│   │       └── SelectMoodMeterTab/
│   ├── hooks/                  # 커스텀 훅
│   ├── queries/                # TanStack Query 훅 (useXxxQuery.ts)
│   ├── service/                # API 서비스 레이어
│   │   ├── index.ts            # APIClient 클래스 (싱글턴)
│   │   ├── type.ts             # APIRequest, HTTP_METHOD 타입
│   │   ├── responseType.ts     # 공통 응답 타입
│   │   ├── auth/               # 도메인별 API (index.ts + type.ts)
│   │   ├── book/
│   │   ├── diary/
│   │   ├── record/
│   │   └── weekly/
│   ├── interface/
│   │   └── key/
│   │       └── queryKey.ts     # React Query 키 상수
│   └── styles/                 # StyleSheet 파일 (화면/컴포넌트별 분리)
│
├── assets/
│   ├── fonts/                  # Pretendard (가중치별), Hakgyoansim
│   ├── images/                 # 아이콘, 이모지 이미지
│   └── *.json                  # Lottie 애니메이션
│
├── android/                    # Android 네이티브 빌드
├── app.config.ts               # Expo 설정 (동적, dotenv 사용)
├── eas.json                    # EAS Build 설정
└── tsconfig.json
```

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

### 3. React Query 훅
`src/queries/useXxxQuery.ts`에서 `useMutation` / `useQuery`로 래핑.  
파일 업로드(multipart)는 `expo-file-system`의 `FileSystem.uploadAsync` 직접 사용.

### 4. 스타일 분리
- 모든 스타일은 `src/styles/`에 `StyleSheet.create()`로 정의
- 화면/컴포넌트별로 파일 분리 (`recordingScreenStyles.ts` 등)
- 공통 스타일은 `src/styles/common.ts`
- 폰트 크기는 반드시 `RFValue()`로 처리

### 5. 인증 흐름
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

## 폰트 사용 규칙

| 폰트명 | 원본 | 설명 |
|--------|------|------|
| `Hakgyoansim` | Hakgyoansim-Geurimilgi | 포인트 손글씨체 |
| `Pretendard1`~`Pretendard9` | Pretendard Thin~Black | 숫자 = 굵기 단계 (1=Thin, 9=Black) |

기본 본문: `Pretendard4` (Regular)  
주요 UI 텍스트: `Pretendard6` (SemiBold) 또는 `Pretendard7` (Bold)

---

## 참고 사항

- 화면 방향은 `portrait` 고정
- 다크모드: `userInterfaceStyle: 'automatic'` (지원)
- New Architecture 활성화 (`newArchEnabled: true`)
- Android 패키지명: `com.thedayoftoday.app`
- 세부 규칙은 각 폴더의 `CLAUDE.md` 참고
