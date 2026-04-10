---
name: 참고 프로젝트 컨벤션 요약
description: ppi_solar_fe, iceh_fe 두 참고 프로젝트의 핵심 컨벤션 — TheDayOfToday 리팩토링 기준
type: reference
originSessionId: 8a038bf9-4f43-4b98-ae71-57728703af63
---
## 공통 핵심 컨벤션 (두 프로젝트 모두 동일)

### 파일/폴더 네이밍
- 컴포넌트 폴더/파일: PascalCase (`BlockComponent/`, `Modal.tsx`)
- 훅, 유틸, 타입 파일: camelCase (`useModal.ts`, `type.ts`, `queryKey.ts`)
- 서비스 폴더: 소문자 (`auth/`, `diary/`)
- 각 컴포넌트는 폴더/index.tsx 구조

### 컴포넌트 패턴
- 함수형 컴포넌트만 사용
- named export 사용 (default export 지양)
- app/ 라우트 파일은 expo-router 요구로 default export 유지

### 서비스 레이어
```ts
// 단순 async 함수 패턴
export const login = async (params: LoginParams) => {
  return apiClient.post<LoginResponse>('/auth/signIn', params);
};
```
- apiClient는 axios 인스턴스 싱글턴
- 클래스 기반 아님

### Query Key 팩토리 (iceh_fe 방식)
```ts
export const userKeys = {
  all: ['user'],
  lists: () => [...userKeys.all, 'list'],
  list: (params?: AllUserParams) => [...userKeys.all, 'list', params],
  detail: (id: number) => [...userKeys.all, 'detail', id],
} as const;
```

### 타입 정의
- interface: 객체 형태, 확장 가능한 것
- type: 유니온, 인터섹션, 단순 alias
- Zod(ppi_solar_fe) 또는 interface(iceh_fe) — TheDayOfToday는 interface 중심 유지 권장

### Zustand 상태 관리 패턴
```ts
// Data와 Action 인터페이스 분리
interface StoreData { ... }
interface StoreAction { set...: (data) => void; reset...: () => void; }
const useXxxStore = create(persist<StoreData & StoreAction>(...));
```
- sessionStorage 사용
- TheDayOfToday는 현재 Zustand 없음 (AsyncStorage + React Query로 충분)

### ESLint 공통 규칙
```js
{
  'no-console': 'error',
  'no-var': 'error',
  'semi': 'error',
  'quotes': ['error', 'single'],
  'object-shorthand': ['error', 'always'],
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  'no-restricted-imports': ['error', { patterns: [{ group: ['../../../*'], message: '절대경로로 변경해주세요.' }] }],
  'react/self-closing-comp': 'error',
}
```

### Import 순서
1. builtin (Node.js)
2. external (npm 패키지)
3. @/* (절대경로 alias)
4. relative imports
5. type imports (마지막)

### 커밋 컨벤션
- feat: 기능 추가
- fix: 버그 수정
- refactor: 코드 구조 개선
- style: 스타일 변경
- docs: 문서 변경
- chore: 라이브러리 업데이트

## ppi_solar_fe vs iceh_fe 차이점
| 항목 | ppi_solar_fe | iceh_fe |
|------|-------------|---------|
| 경로 alias | 13개 명시적 | @/* 단일 |
| 타입 방식 | Zod + Interface | Interface 중심 |
| Query 훅 | 직접 사용 | 훅으로 래핑 |
| MSW | 없음 | 있음 |
