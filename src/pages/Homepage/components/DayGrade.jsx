import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DayGrade = () => {
    const [grade, setGrade] = useState('불러오는 중...');

    useEffect(() => {
      const fetchGrade = async () => {
        try {
          const res = await axios.get('http://localhost:3001/api/today-grade');
          setGrade(res.data.grade);
        } catch (error) {
          setGrade('불러오기 실패');
          console.error('에러:', error);
        }
      };
      fetchGrade();
    }, []);
  
    return (
      <div className="p-4 border rounded shadow w-fit" style={{ height: "267px"  ,textAlign :'center', minWidth:"100%"}}>
        <h6 >오늘의 아이템 등급</h6>
        <hr/>
        <div style={{ padding:"20px", fontSize:"40px", color:"red"}}>{grade}</div>
      </div>
    );
  };
  

export default DayGrade
