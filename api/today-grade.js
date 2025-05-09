//오늘의 등급 
const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
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
    };