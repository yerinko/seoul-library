import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  IconButton,
  Collapse,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useState } from 'react'
import type { Book } from '../types/book'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


interface BookListProps {
  books: Book[]
}

const BookList = ({ books }: BookListProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  if (books.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 6, sm: 8 },
          px: { xs: 2, sm: 3 },
          bgcolor: '#FFFFFF',
          borderRadius: 3,
          border: '1px dashed #E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 2, sm: 3 },
          justifyContent: 'center',
          width: '100%',
          minHeight: { xs: '300px', sm: '400px' },
        }}
      >
        <Box
          sx={{
            width: { xs: '200px', sm: '300px' },
            height: { xs: '200px', sm: '300px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DotLottieReact
            src="https://lottie.host/320537a7-7401-4648-acf8-79c93d57ecab/1d9d4P3fTm.lottie"
            loop
            autoplay
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', sm: '1.125rem' },
            fontWeight: 500,
            wordBreak: 'keep-all',
            textAlign: 'center',
            px: { xs: 2, sm: 0 },
          }}
        >
          검색 결과가 없습니다
        </Typography>
      </Box>
    )
  }

  return (
    <Stack spacing={3}>
      {books.map((book) => (
        <Card
          key={book.id}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'stretch',
            overflow: 'visible',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: '100%', sm: 160 },
              height: { xs: 240, sm: 240 },
              objectFit: 'cover',
              borderRadius: { xs: '12px 12px 0 0', sm: '12px 0 0 12px' },
            }}
            image={book.imageUrl}
            alt={book.title}
          />
          <CardContent
            sx={{
              flex: 1,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  mb: 1,
                  letterSpacing: '-0.03em',
                  wordBreak: 'keep-all',
                }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: '0.875rem',
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                {book.author} · {book.publisher} · {book.publishYear}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  fontSize: '0.875rem',
                  mb: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {book.description}
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  py: 1,
                }}
                onClick={() => setExpandedId(expandedId === book.id ? null : book.id)}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  소장정보 보기
                  <Chip
                    label={`${book.statusByLibrary.length}개 도서관`}
                    size="small"
                    sx={{
                      ml: 1,
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: 600,
                      height: 24,
                    }}
                  />
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    color: 'primary.main',
                    transform: expandedId === book.id ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Box>

              <Collapse in={expandedId === book.id}>
                <Stack
                  spacing={2}
                  sx={{
                    mt: 2,
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: '#F9FAFB',
                    borderRadius: 2,
                  }}
                >
                  {book.statusByLibrary.map((status, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: { xs: 2, sm: 2.5 },
                        bgcolor: '#FFFFFF',
                        borderRadius: 2,
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                        border: '1px solid',
                        borderColor: status.loanStatus === '대출가능' ? '#10B981' : '#E5E7EB',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': status.loanStatus === '대출가능' ? {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '4px',
                          bgcolor: '#10B981',
                          borderRadius: '4px 0 0 4px',
                        } : {},
                      }}
                    >
                      <Stack spacing={1.5}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: { xs: 1, sm: 0 }
                        }}>
                          <Typography
                            sx={{
                              fontSize: { xs: '0.9rem', sm: '1rem' },
                              fontWeight: 600,
                              color: 'text.primary',
                              width: '100%',
                              textAlign: { xs: 'center', sm: 'left' }
                            }}
                          >
                            {status.library}
                          </Typography>
                          <Chip
                            label={status.loanStatus}
                            size="small"
                            sx={{
                              bgcolor: status.loanStatus === '대출가능' ? '#ECFDF5' : '#FEF2F2',
                              color: status.loanStatus === '대출가능' ? '#059669' : '#DC2626',
                              fontWeight: 600,
                              px: 1,
                              minWidth: '80px',
                              justifyContent: 'center'
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: { xs: 'center', sm: 'flex-start' },
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 1, sm: 2 },
                            color: 'text.secondary',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '0.875rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              textAlign: { xs: 'center', sm: 'left' },
                              width: { xs: '100%', sm: 'auto' }
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: 'text.secondary',
                                display: { xs: 'none', sm: 'inline-block' }
                              }}
                            />
                            {status.location}
                          </Typography>
                          {status.returnDate && (
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                textAlign: { xs: 'center', sm: 'left' },
                                width: { xs: '100%', sm: 'auto' }
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  bgcolor: 'text.secondary',
                                  display: { xs: 'none', sm: 'inline-block' }
                                }}
                              />
                              반납예정일: {status.returnDate}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Collapse>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}

export default BookList 