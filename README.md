# 여행 상품 주문 웹앱

> **https://jinseungyeol.github.io/react-context-app/** — Context API 전역 상태 + Express API로 만든 주문 웹앱

Context API로 주문 상태를 전역 관리하는 여행 상품 주문 웹앱입니다. 상품·옵션 선택 → 주문 요약 → 완료의 3단계 흐름을 구현했고, 상품·옵션·주문 API를 제공하는 **Express 서버를 직접 만들어** 클라이언트-서버 분리 구조를 경험했습니다.

## 구성

```
client/   # React 앱 (CRA)
server/   # Express API 서버
```

### client (React)

- **`OrderContext`** — 상품·옵션별 수량과 소계·총계를 전역 관리. `useContext`로 어느 컴포넌트에서든 주문 상태에 접근
- **3단계 주문 흐름** — `OrderPage`(상품·옵션 선택) → `SummaryPage`(주문 확인·동의) → `CompletePage`(주문 접수·주문번호 표시), step 상태로 페이지 전환
- **컴포넌트 분리** — `Type`(상품/옵션 공용 로더), `Products`, `Options`, `ErrorBanner`
- React Testing Library 테스트 셋업 포함

### server (Express)

- 상품·옵션 조회 API, 주문 접수 API(주문번호 발급)
- CORS 화이트리스트, 이미지 정적 서빙
- Jest + Supertest 테스트

## 데모에 대해

무료 Node 호스팅(Render)은 슬립·만료로 서버가 자주 죽어 데모가 깨지는 문제가 있었습니다. 그래서 **데모 빌드는 서버 응답(상품·옵션 JSON, 이미지)을 `public/`에 정적으로 내장하고 주문 처리를 클라이언트에서 시뮬레이션**해 GitHub Pages에서 서버 없이 완전하게 동작합니다. 실제 API 구현은 `server/`에서 확인할 수 있습니다.

## 로컬 실행

```bash
# 서버 (http://localhost:4000)
cd server
npm install
npm start

# 클라이언트 (http://localhost:3000)
cd client
npm install
npm start
```

## 배포

```bash
cd client
npm run build
npm run deploy     # gh-pages 브랜치로 배포
```
