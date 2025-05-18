import { useEffect, useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  Paper,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import axios from 'axios';

import BookList from './BookList';
import type { Book } from '../types/book';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  const { data: books, isLoading } = useQuery<Book[]>(
    ['books', debouncedTerm],
    async () => {
      if (!debouncedTerm) return [];
      // TODO: 실제 API 엔드포인트로 교체
      const response = await axios.get(`/api/books?search=${debouncedTerm}`);
      return response.data;
    },
    {
      enabled: Boolean(debouncedTerm),
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        강동 숲속 도서관 도서 검색
      </Typography>

      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: 'white', borderRadius: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="책 제목, 저자, 출판사를 검색해보세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: isLoading && (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Paper>

      <BookList books={books || []} />
    </Box>
  );
};

export default BookSearch; 