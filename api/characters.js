//캐릭터
const axios = require('axios');
const DNF_API_KEY = process.env.REACT_APP_DNF_API_KEY;

module.exports =async (req, res) => {
  
  const serverId = req.query.serverId 
  const characterName = req.query.characterName 

  try {
    const response = await axios.get(
      `https://api.neople.co.kr/df/servers/${serverId}/characters?characterName=${characterName}&wordType=full&limit=9&apikey=${DNF_API_KEY}`,

    );
    const characters = response.data.rows || []

    const detailedCharacters= await Promise.all(
      characters.map(async(char)=>{
        return{
          characterId : char.characterId,
          characterName: char.characterName,
          level: char.level,
          jobGrowName: char.jobGrowName,
          serverId: char.serverId,
          fame : char.fame,
          characterImage: ` https://img-api.neople.co.kr/df/servers/${char.serverId}/characters/${char.characterId}?zoom=3`
        };
      })
    );
  
    
    res.json(detailedCharacters);
  } catch (err) {
    console.error("DNF API error:", err.message);
    res.status(500).json({ error: "Failed to fetch character info" });
  }
};