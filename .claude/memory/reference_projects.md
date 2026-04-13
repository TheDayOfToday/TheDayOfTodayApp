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
