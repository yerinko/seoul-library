import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Container, Box, Typography, ThemeProvider, createTheme, useMediaQuery, CssBaseline, CircularProgress } from '@mui/material'
import './App.css'
import Search from './components/Search'
import BookList from './components/BookList'
import { searchBooks } from './services/libraryAPI'
import type { Book } from './types/book'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1B873D',
      light: '#4CAF50',
      dark: '#0E5C1F',
    },
    secondary: {
      main: '#00796B',
      light: '#26A69A',
      dark: '#004D40',
    },
    background: {
      default: '#FAFCF8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A2421',
      secondary: '#4B635E',
    },
  },
  typography: {
    fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
      fontSize: '2rem',
    },
    body1: {
      letterSpacing: '-0.02em',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FAFCF8',
          backgroundImage: 'linear-gradient(rgba(250, 252, 248, 0.8), rgba(250, 252, 248, 0.8))',
          backgroundRepeat: 'repeat',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
          border: '1px solid rgba(220, 230, 220, 0.5)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 28,
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
          padding: '10px 20px',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1B873D',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E5EBE5',
          },
        },
      },
    },
  },
});

const App = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const handleSearch = async (query: string) => {
    setSearchKeyword(query);

    if (!query.trim()) {
      setSearchResults(books)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await searchBooks({
        keyword: query
      })
      setSearchResults(response.books)
    } catch (err) {
      setError('도서 검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      console.error('Search error:', err)
      setSearchResults(books)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchAllBooks = async () => {
      if (books.length > 0) return;

      try {
        const response = await searchBooks({ keyword: '' })
        setBooks(response.books)
        setSearchResults(response.books)
      } catch (err) {
        setError('도서 목록을 불러오는 중 오류가 발생했습니다.')
        console.error('Initial load error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllBooks()
  }, [books.length])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        pt: isSmallScreen ? 3 : 5,
        pb: 6
      }}>
        <Container
          maxWidth="sm"
          sx={{
            px: isSmallScreen ? 2 : 3,
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{
            mb: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: -24,
              top: '50%',
              width: 4,
              height: '70%',
              bgcolor: 'secondary.main',
              transform: 'translateY(-50%)',
              borderRadius: 2,
            }
          }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                textAlign: 'left',
                fontSize: isSmallScreen ? '1.75rem' : '2.5rem',
                color: 'text.primary',
                mb: 1,
                position: 'relative',
              }}
            >
              강동숲속도서관 🌳
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                textAlign: 'left',
                fontSize: '1.125rem',
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              대여도 간편하게, 이용도 편안하게 – 우리 동네 스마트 도서관
            </Typography>
          </Box>

          <Search onSearch={handleSearch} />

          <Box sx={{ flex: 1, width: '100%' }}>
            {isLoading ? (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px'
              }}>
                <CircularProgress sx={{ color: 'primary.main' }} />
              </Box>
            ) : error ? (
              <Box sx={{
                textAlign: 'center',
                mt: 4,
                p: 3,
                bgcolor: 'rgba(220, 38, 38, 0.05)',
                borderRadius: 2,
                color: '#DC2626',
                border: '1px solid rgba(220, 38, 38, 0.1)',
              }}>
                <Typography sx={{ fontWeight: 500 }}>{error}</Typography>
              </Box>
            ) : (
              <BookList books={searchResults} />
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App 