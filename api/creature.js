
//장착 크리처 정보 


const axios = require('axios');
const DNF_API_KEY = process.env.REACT_APP_DNF_API_KEY;

module.exports= async (req, res) => {
  
  const serverId = req.query.serverId 
  const characterId = req.query.characterId

  try {
    const response = await axios.get(
      `https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/creature?apikey=${DNF_API_KEY}`,
    );
    const Creature = response.data.creature || []

    const detailsCreature = {
        Creature : Creature,
        CreatureImg : `https://img-api.neople.co.kr/df/items/${Creature? Creature.itemId : ""}`,
        ArtifactImg : Creature? Creature.artifact.map(a =>{return (`https://img-api.neople.co.kr/df/items/${a.itemId}`)}) :"" ,
        Clone : Creature?.clone,
        ColoneImg : Creature?.clone?.itemId !==null ?`https://img-api.neople.co.kr/df/items/${ Creature?.clone?.itemId}` : ""
    }
    
  
    console.log(detailsCreature );
   res.json(detailsCreature);
  } catch (err) {
    console.error("DNF API error:", err.message);
    res.status(500).json({ error: "Failed to fetch character info" });
  }
};