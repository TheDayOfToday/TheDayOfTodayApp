---
name: 대규모 리팩토링 계획
description: ppi_solar_fe, iceh_fe 참고 프로젝트 기반 코드/스타일 컨벤션 리팩토링 단계별 계획
type: project
originSessionId: 8a038bf9-4f43-4b98-ae71-57728703af63
---
## 목표
ppi_solar_fe, iceh_fe 두 참고 프로젝트의 컨벤션에 맞게 TheDayOfToday 프론트 코드 전반을 리팩토링.
폴더 구조는 이미 맞춰져 있는 상태. 코드 컨벤션, 스타일 컨벤션이 남아있음.

## 진행 순서 (다음 세션부터 시작)

### Step 1: ESLint 규칙 강화 (기준선 잡기) ← 다음 세션 시작점
참고 프로젝트에서 공통 적용하는 규칙들을 `.eslintrc.js`에 추가:
- `no-console: 'error'`
- `no-var: 'error'`
- `semi: 'error'`
- `quotes: ['error', 'single']`
- `object-shorthand: ['error', 'always']`
- `@typescript-eslint/no-unused-vars: ['error', { argsIgnorePattern: '^_' }]`
- `no-restricted-imports` — 3단계 이상 상대경로 금지 (`../../../*`)
- import 정렬 순서 강제 (`eslint-plugin-import` 활용)

### Step 2: 타입 정의 정리
- `src/service/type.ts`의 `any` 제거 → params, data, convertBody 타입 구체화
- interface vs type 사용 일관성:
  - interface → 객체 형태, 확장 가능한 것
  - type → 유니온, 인터섹션, 단순 alias
- 현재 혼용 상태 정리

### Step 3: Query Key 팩토리 패턴 적용
- `src/interface/key/queryKey.ts` 재작성
- iceh_fe 방식 적용:
```ts
export const diaryKeys = {
  all: ['diary'],
  lists: () => [...diaryKeys.all, 'list'],
  detail: (id: number) => [...diaryKeys.all, 'detail', id],
} as const;
```
- 현재 상태 파악 필요 (queryKey.ts 내용 확인)

### Step 4: 서비스 레이어 전환 (가장 큰 작업, Opus 권장)
- 현재: 클래스 기반 `APIClient.of(XxxClass)` 패턴
- 목표: 단순 async 함수 패턴
```ts
// 변경 후
export const postLogin = async (params: LoginRequest) => {
  return apiClient.post<LoginResponse>('/swagger-auth/login', params);
};
```
- 영향 범위: src/service/ 전체 + src/queries/ 전체
- **주의:** 파일 업로드(FileSystem.uploadAsync)는 APIClient 미사용 → 변경 불필요
- **주의:** 이 단계는 모델을 Opus로 변경 후 진행 권장 (`/model opus`)

### Step 5: 컴포넌트 export 통일
- default export → named export로 통일
- 영향 범위: src/components/common/ + app/ 화면 컴포넌트들
- app/ 화면은 expo-router 때문에 default export 유지 필요 → 제외

### Step 6: import 정렬 통일
- eslint --fix로 자동 정렬 가능한 부분 처리
- 수동 정리 필요한 부분 확인

## 참고 파일 위치
- 참고 프로젝트 1: `C:\Users\jkcore\lsj\projects\ppi_solar_fe`
- 참고 프로젝트 2: `C:\Users\jkcore\lsj\projects\iceh_fe`
