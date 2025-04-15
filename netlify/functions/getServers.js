const axios = require('axios');

exports.handler = async () => {
  try {
    const res = await axios.get('https://api.neople.co.kr/df/servers', {
      params: {
        apikey: process.env.API_KEY,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '서버 목록 가져오기 실패' }),
    };
  }
};