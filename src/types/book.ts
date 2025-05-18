export interface BookStatus {
  library: string;
  hasBook: boolean;
  loanStatus: string;
  returnDate: string | null;
  location: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publishYear: string;
  imageUrl: string;
  isbn: string;
  callNumber: string;
  library: string;
  location: string;
  isAvailable: boolean;
  returnDate: string | null;
  statusByLibrary: BookStatus[];
  description?: string;
  reservationCount?: number;
} 