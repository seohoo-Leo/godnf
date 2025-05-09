
 //경매장 검색
 const axios = require('axios');
 const DNF_API_KEY = process.env.REACT_APP_DNF_API_KEY;

 module.exports= async (req, res) => {

  try {
    const itemId = req.query.itemId
    const rarity = req.query.rarity

    const {data} = await axios.get(
      `https://api.neople.co.kr/df/auction?itemId=${itemId}&wordType=full&wordShort=true&${rarity==="전체"?" ":"q=rarity:"+rarity }&sort=unitPrice:asc&limit=400&apikey=${DNF_API_KEY}`
    ); 

    res.json(data)
    console.log(data);

  } catch (error) {
    console.error('DNF API 요청 실패:', error);
    res.status(500).json({ error: 'DNF API 호출 실패' });
  } 
};