---
name: 프로젝트 설정 현황
description: 2026-04-10 세션에서 완료한 설정 작업 및 각 파일의 현재 상태
type: project
originSessionId: 8a038bf9-4f43-4b98-ae71-57728703af63
---
## 완료된 작업

### 1. .claude/CLAUDE.md 생성
- 위치: `.claude/CLAUDE.md` (루트가 아닌 .claude 폴더 내부에 위치)
- 내용: 프로젝트 개요, 기술 스택, 폴더 구조, 아키텍처 핵심 패턴, 환경 변수, 폰트 규칙

### 2. tsconfig.json 수정
- `"moduleResolution": "bundler"` 추가
- **Why:** `expo/tsconfig.base`가 deprecated된 `node10` 방식을 상속하므로 override 필요

### 3. ESLint 설정 (현재 작동 중)
- `.eslintrc.js` 위치: 프로젝트 루트
- `eslint-config-expo` 제거됨 (버전 호환 문제로 포기)
- 현재 설치된 ESLint 관련 패키지 (package.json devDependencies):
  - `eslint@^8.57.1`
  - `eslint-plugin-react@latest`
  - `eslint-plugin-react-hooks@latest`
  - `eslint-plugin-import@^2.32.0`
  - `@typescript-eslint/eslint-plugin@^8.22.0`
  - `@typescript-eslint/parser@^8.22.0`
- 현재 `.eslintrc.js` 내용:
```js
module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['dist/', 'android/', '.expo/'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
```
- lint 스크립트: `"lint": "expo lint"` → 실제로는 `eslint .` 실행됨
- `npm run lint -- --fix` 실행 시 자동 수정 가능
- lint 에러가 많이 남아있음 (아직 수정 시작 안 함)

**Why:** eslint-config-expo@55은 flat config(ESLint v9)용이고, eslint-plugin-import TypeScript 리졸버 충돌로 expo 설정 사용 불가. 직접 플러그인 구성으로 우회.

## 현재 남아있는 lint 에러
- `@typescript-eslint/no-explicit-any` — service/type.ts의 params, data, convertBody
- 그 외 다수 (아직 전체 목록 미파악)
