# 공통 핵심 컨벤션 (두 프로젝트 모두 동일)

## 파일/폴더 네이밍
- 컴포넌트 폴더/파일: PascalCase (`BlockComponent/`, `Modal.tsx`)
- 훅, 유틸, 타입 파일: camelCase (`useModal.ts`, `type.ts`, `queryKey.ts`)
- 서비스 폴더: 소문자 (`auth/`, `diary/`)
- 각 컴포넌트는 폴더/index.tsx 구조

## ESLint 공통 규칙
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

## Import 순서
1. builtin (Node.js)
2. external (npm 패키지)
3. @/* (절대경로 alias)
4. relative imports
5. type imports (마지막)
