//장착장비 상세정보
const axios = require('axios');
const DNF_API_KEY = process.env.REACT_APP_DNF_API_KEY;


module.exports=async (req, res) => {
  try {
    const itemId = req.query.itemId

    const { data } = await axios.get(
      `https://api.neople.co.kr/df/items/${itemId}?apikey=${DNF_API_KEY}`
    );
    res.json(data);
    
  } catch (error) {
    console.error('DNF API 요청 실패:', error);
    res.status(500).json({ error: 'DNF API 호출 실패' });
  }
};
