# TheDayOfToday — 개발 명령어

## 설치

```bash
npm install
```

---

## 실행

### 개발 서버 시작 (Metro Bundler)

```bash
npm start
# 또는
npx expo start
```

실행 후 터미널에서 다음 키로 디바이스를 선택한다:
- `a` — Android 에뮬레이터 또는 연결된 기기
- `i` — iOS 시뮬레이터 (macOS 전용)
- `w` — 웹 브라우저

### Android 빌드 및 실행

```bash
npm run android
# 또는
npx expo run:android
```

> Android Studio 에뮬레이터 또는 USB 연결된 기기가 필요하다.

### iOS 빌드 및 실행

```bash
npm run ios
# 또는
npx expo run:ios
```

> macOS + Xcode 환경에서만 동작한다.

### 웹 실행

```bash
npm run web
# 또는
npx expo start --web
```

---

## 린트

```bash
npm run lint
# 또는
npx expo lint
```

자동 수정:

```bash
npx eslint --fix src/ app/
```

---

## 테스트

```bash
npm test
# 또는
npx jest --watchAll
```

---

## 디버깅

### React Native Debugger / Chrome DevTools

`npm start` 실행 후 터미널에서 `j`를 누르면 JS 디버거가 열린다.

### 로그 확인 (Android)

```bash
npx react-native log-android
```

### Expo Dev Client (개발 빌드)

```bash
npx expo start --dev-client
```

디바이스에 `expo-dev-client`가 설치된 개발 빌드가 있어야 한다.

---

## 기타

### 프로젝트 초기화 (스타터 코드 제거)

```bash
npm run reset-project
```

> `app/` 디렉토리를 초기화하고 기존 코드를 `app-example/`로 이동한다. **주의해서 사용할 것.**
