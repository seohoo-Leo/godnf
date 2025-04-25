const express = require('express');
const axios = require('axios');
const cors = require('cors');
const puppeteer = require('puppeteer');
require('dotenv').config();
const app = express();
const PORT = 3001;
const DNF_API_KEY = process.env.REACT_APP_DNF_API_KEY;

app.use(cors());
//서버
app.get('/api/servers', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.neople.co.kr/df/servers?apikey=${DNF_API_KEY}`
    );
    res.json(data);
  } catch (error) {
    console.error('DNF API 요청 실패:', error);
    res.status(500).json({ error: 'DNF API 호출 실패' });
  }
});
//캐릭터 디테일
app.get("/api/characters/details", async (req, res) => {
  
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
});

//캐릭터
app.get("/api/characters", async (req, res) => {
  
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
          serverId,
          fame : char.fame,
          characterImage: ` https://img-api.neople.co.kr/df/servers/${serverId}/characters/${char.characterId}?zoom=3`
        };
      })
    );
    
    console.log(detailedCharacters);
    
    res.json(detailedCharacters);
  } catch (err) {
    console.error("DNF API error:", err.message);
    res.status(500).json({ error: "Failed to fetch character info" });
  }
});

//오늘의 등급 

app.get('/api/today-grade', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
 
    const page = await browser.newPage();

    await page.setRequestInterception(true);
page.on('request', (req) => {
  const type = req.resourceType();
  if (['stylesheet', 'font', 'image'].includes(type)) {
    req.abort();
  } else {
    req.continue();
  }
});

//장착장비
app.get('/api/EItem', async (req, res) => {
  try {
    const serverId = req.query.serverId 
    const characterId = req.query.characterId 

    const { data } = await axios.get(
      `https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/equipment?apikey=${DNF_API_KEY}`
    );
    res.json(data);
    
  } catch (error) {
    console.error('DNF API 요청 실패:', error);
    res.status(500).json({ error: 'DNF API 호출 실패' });
  }
});

//장착장비 상세정보
app.get('/api/itemId', async (req, res) => {
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
});


  // 페이지 접속 (60초까지 기다림)
  await page.goto('https://dfmax.xyz', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

    // 해당 요소 로딩될 때까지 대기
  await page.waitForSelector('span.todayGrade', { timeout: 60000 });

  // 정보 추출
  const grade = await page.$eval('span.todayGrade', el => el.textContent.trim());

  console.log('🎯 오늘의 아이템 등급:', grade);

  await browser.close();
  res.json({ grade });
  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).json({ grade: '불러오기 실패' });
  }
});



app.listen(PORT, () => {
  console.log(`🔐 프록시 서버 실행 중: http://localhost:${PORT}`);
});