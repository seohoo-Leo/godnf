
//장착 아바타 정보 
const axios = require('axios');
const DNF_API_KEY = process.env.REACT_APP_DNF_API_KEY;

module.exports = async (req, res) => {
  
  const serverId = req.query.serverId 
  const characterId = req.query.characterId

  try {
    const response = await axios.get(
      `https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/avatar?apikey=${DNF_API_KEY}`,
    );
    const Avatar = response.data.avatar || []
    const detailsAvatar= await Promise.all(
      Avatar.map(async(char)=>{
        return{
          avatar : char,
          clone : char?.clone,
          avatarImage:`https://img-api.neople.co.kr/df/items/${char?.itemId}`,
          cloneImage:
          char?.clone["itemId"] === null ?"":
          `https://img-api.neople.co.kr/df/items/${(char?.clone["itemId"])}`
        };
       
      })
    );
    
    res.json(detailsAvatar);
  } catch (err) {
    console.error("DNF API error:", err.message);
    res.status(500).json({ error: "Failed to fetch character info" });
  }
};