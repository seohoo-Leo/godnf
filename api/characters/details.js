//캐릭터 디테일
const axios = require('axios');
const DNF_API_KEY = process.env.REACT_APP_DNF_API_KEY;


module.exports= async (req, res) => {
  
  const serverId = req.query.serverId 
  const characterId = req.query.characterId 

  try {
    const response = await axios.get(
      `https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?apikey=${DNF_API_KEY}`,

    );
    const characters = response.data
 
     console.log(characters);
    const detailedCharacters={ 
        characterId:  characters.characterId,
        characterName: characters.characterName,
        level: characters.level,
        jobId: characters.jobId,
        jobGrowId: characters.jobGrowId,
        jobName:characters.jobName,
        jobGrowName:characters.jobGrowName,
        fame:characters.fame,
        adventureName :characters.adventureName,
        guildId :characters.guildId,
        guildName :characters.guildName,
        characterImage:`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`
  }
    
    console.log(detailedCharacters);
    
    res.json(detailedCharacters);
  } catch (err) {
    console.error("DNF API error:", err.message);
    res.status(500).json({ error: "Failed to fetch character info" });
  }
};