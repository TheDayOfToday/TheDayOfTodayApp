# 프로젝트 컨벤션 및 린트 준수

코드·스타일을 작성·수정할 때 아래를 **항상** 따른다.

## 상세 가이드

프로젝트 전체 컨벤션(아키텍처, APIClient 패턴, 서비스 레이어, 폴더 구조)은 **`.claude/CLAUDE.md`**를 기준으로 한다. 해당 문서와 충돌하는 패턴은 사용하지 않는다.

## Container / Presentational

- **메인 화면**(`app/` 하위 라우트 진입 컴포넌트): 레이아웃과 하위 컴포넌트 조합만 담당한다. `useState`, `useEffect`, `useQuery` 등 **훅을 직접 사용하지 않는다**.
- **하위 컴포넌트**(`src/components/`): 데이터 fetching, 상태 관리, 비즈니스 로직·훅을 담당한다.

## ESLint

- 설정 파일: 루트 **`eslint.config.js`**
- 작성 결과는 ESLint 오류 없이 통과할 수 있어야 한다. `eslint-disable` 주석은 불가피한 경우에만 최소 범위로 사용한다.
- 특히 다음을 맞춘다.
  - 타입으로만 사용하는 import는 반드시 `import type` 사용
  - import 그룹 간 빈 줄 1개 필수 (외부 패키지 → 내부 `@/` 모듈 순)
  - `console` 사용 금지
  - 문자열은 작은따옴표, JSX 속성은 큰따옴표

## 스타일

- 인라인 스타일 금지. 모든 스타일은 `src/styles/`에 `StyleSheet.create()`로 정의한다.
- 화면·컴포넌트별로 파일을 분리한다 (`recordingScreenStyles.ts` 등).
- 공통 스타일은 `src/styles/common.ts`에 작성한다.
- 폰트 크기는 반드시 `RFValue()`로 처리한다. 하드코딩 금지.

## 컴포넌트

- 공용 컴포넌트는 `src/components/common/<Name>/index.tsx` 구조로 생성한다.
- **named export**를 사용한다. default export는 `app/` 라우트 파일(expo-router 요구)에만 허용한다.

## TypeScript

- `interface`: 객체 형태이거나 확장 가능한 타입에 사용한다.
- `type`: 유니온, 인터섹션, 단순 alias에 사용한다.
- 혼용하지 않는다.

## 커밋 컨벤션
- feat: 기능 추가
- fix: 버그 수정
- refactor: 코드 구조 개선
- style: 스타일 변경
- docs: 문서 변경
- chore: 라이브러리 업데이트
