import axios from 'axios';
import type { Book } from '../types/book';

const API_KEY = import.meta.env.VITE_LIBRARY_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// TODO: 현재 Mock 데이터로 대체되어 있음. API 연동 시 삭제 예정
const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: '클린 코드',
    author: '로버트 C. 마틴',
    publisher: '인사이트',
    publishYear: '2013',
    imageUrl: 'https://image.aladin.co.kr/product/3408/36/cover200/8966260950_2.jpg',
    isbn: '9788966260959',
    callNumber: '005.1',
    library: '강동구립성내도서관',
    location: '자료실',
    isAvailable: true,
    returnDate: null,
    description: '애자일 소프트웨어의 혁명적인 패러다임을 제시하는 책',
    reservationCount: 0,
    statusByLibrary: [
      {
        library: '강동구립성내도서관',
        hasBook: true,
        loanStatus: '대출가능',
        returnDate: null,
        location: '종합자료실'
      }
    ]
  },
  {
    id: 2,
    title: '해리포터와 마법사의 돌',
    author: 'J.K. 롤링',
    publisher: '문학수첩',
    publishYear: '2019',
    imageUrl: 'https://image.aladin.co.kr/product/29302/87/cover200/8983929022_1.jpg',
    isbn: '9788983920720',
    callNumber: '843.6',
    library: '강동구립천호도서관',
    location: '자료실',
    isAvailable: false,
    returnDate: '2024-04-30',
    description: '전 세계를 사로잡은 마법 판타지 소설',
    reservationCount: 2,
    statusByLibrary: [
      {
        library: '강동구립천호도서관',
        hasBook: true,
        loanStatus: '대출중',
        returnDate: '2024-04-30',
        location: '어린이자료실'
      }
    ]
  },
  {
    id: 3,
    title: '부업왕 엄마의 방구석 돈 공부 ',
    author: '안선우',
    publisher: '카시오페아',
    publishYear: '2020',
    imageUrl: 'https://image.aladin.co.kr/product/24108/33/cover200/k682639534_1.jpg',
    isbn: '9788983711892',
    callNumber: '440',
    library: '강동구립해공도서관',
    location: '자료실',
    isAvailable: true,
    returnDate: null,
    description: '마이너스로 시작해 부업만으로 돈을 모은 시스템의 비밀 ',
    reservationCount: 0,
    statusByLibrary: [
      {
        library: '강동구립해공도서관',
        hasBook: true,
        loanStatus: '대출가능',
        returnDate: null,
        location: '종합자료실'
      }
    ]
  },
  {
    id: 4,
    title: '해리포터와 마법사의 돌2',
    author: 'J.K. 롤링',
    publisher: '문학수첩',
    publishYear: '2019',
    imageUrl: 'https://image.aladin.co.kr/product/646/24/cover200/8956054428_1.jpg',
    isbn: '9788983920720',
    callNumber: '843.6',
    library: '강동구립천호도서관',
    location: '자료실',
    isAvailable: false,
    returnDate: '2024-04-30',
    description: '전 세계를 사로잡은 마법 판타지 소설',
    reservationCount: 2,
    statusByLibrary: [
      {
        library: '강동구립천호도서관',
        hasBook: true,
        loanStatus: '대출중',
        returnDate: '2024-04-30',
        location: '어린이자료실'
      }
    ]
  },
];

interface LibrarySearchParams {
  keyword: string;
  page?: number;
  sort?: string;
}

// Mock 도서 검색
export const searchBooks = async (params: LibrarySearchParams) => {
  // 검색어로 필터링
  const filteredBooks = MOCK_BOOKS.filter(book =>
    book.title.toLowerCase().includes(params.keyword.toLowerCase()) ||
    book.author.toLowerCase().includes(params.keyword.toLowerCase()) ||
    book.publisher.toLowerCase().includes(params.keyword.toLowerCase())
  );

  return {
    books: filteredBooks
  };
};

export const searchBooksAPI = async ({ keyword }: { keyword: string }) => {
  try {
    const response = await axios.get(`${BASE_URL}/web/search`, {
      params: {
        apiKey: API_KEY,
        keyword: keyword,
      }
    });

    return {
      books: response.data as Book[]
    };
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};