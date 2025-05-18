const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/search', async (req, res) => {
  try {
    const response = await axios.get('https://www.gdlibrary.or.kr/web/searchResultList.do', {
      params: req.query,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error('프록시 서버 에러:', error);
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`프록시 서버가 포트 ${PORT}에서 실행 중입니다`);
}); 