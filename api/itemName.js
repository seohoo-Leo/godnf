
//아이템 이름으로 아이템 정보 조회
const axios = require('axios');
const DNF_API_KEY = process.env.REACT_APP_DNF_API_KEY;

module.exports= async (req, res) => {

  try {
    const itemName = req.query.itemName
    const rarity = req.query.rarity

    const {data} = await axios.get(
      `https://api.neople.co.kr/df/items?itemName=${itemName}&wordType=front&${rarity==="전체"?" ":"q=rarity:"+rarity }&limit=30&apikey=${DNF_API_KEY}`
    ); 

    res.json(data)
    console.log(data)


  } catch (error) {
    console.error('DNF API 요청 실패:', error);
    res.status(500).json({ error: 'DNF API 호출 실패' });
  } 
};