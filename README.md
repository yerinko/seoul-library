# 강동숲속도서관 도서 검색 서비스

강동구 도서관의 도서를 검색하고 소장/대출 정보를 확인할 수 있는 웹 서비스입니다.

## 주요 기능

- 도서 검색 (제목, 저자, 출판사)
- 도서 상세 정보 조회
- 도서관별 소장/대출 현황 확인
- 반응형 디자인 지원

## 기술 스택

- React 19
- TypeScript
- Material-UI v7
- Vite
- Axios
- Lottie Animations

## 프로젝트 구조

```
src/
├── components/          # 리액트 컴포넌트
│   ├── BookList.tsx    # 도서 목록 컴포넌트
│   └── Search.tsx      # 검색 컴포넌트
├── services/           # API 서비스
│   └── libraryAPI.ts  # 도서관 API 연동
├── types/             # TypeScript 타입 정의
│   └── book.ts       # 도서 관련 타입
├── assets/           # 정적 리소스
│   └── book-animation.json  # Lottie 애니메이션
├── App.tsx           # 메인 앱 컴포넌트
└── main.tsx         # 앱 진입점
```

## 시작하기

1. 저장소 클론
```bash
git clone https://github.com/your-username/gangdong-library.git
cd gangdong-library
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 필요한 값을 설정합니다.
```bash
cp .env.example .env
```

4. 개발 서버 실행
```bash
npm run dev
```

## 배포

프로덕션 빌드:
```bash
npm run build
```

## 라이선스

MIT License
