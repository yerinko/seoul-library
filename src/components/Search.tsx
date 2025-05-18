import { useState, useEffect, useCallback } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 500),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };


  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <Box sx={{ mb: 5 }}>
      <TextField
        fullWidth
        placeholder="도서명, 저자, 출판사를 검색해보세요"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{
                color: 'primary.main',
                opacity: 0.8
              }} />
            </InputAdornment>
          ),
          sx: {
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            height: '56px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.light',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 20px rgba(27, 135, 61, 0.1)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: '1.5px',
              },
            },
            '& input': {
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: 'text.primary',
              '&::placeholder': {
                color: 'rgba(0, 0, 0, 0.4)',
                opacity: 1,
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default Search; 