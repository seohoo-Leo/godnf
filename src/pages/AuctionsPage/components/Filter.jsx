import React from 'react'
import useItemInfo from '../../store/useItemInfo';
import { useItemName } from '../../../hooks/useItemName';

const Filter = () => {

    const{category,job,weapon,grade,query,
        setCategory,setJob,setWeapon,setGrade,setQuery,setResults,setExpandedItemId,
         JOBSDETAIL,CATEGORIES,JOBS,GRADES,JOB_WEAPONS,ARMOR_TYPES,ACCESSORY_TYPES,SPECIALGEAR_TYPES } = useItemInfo();

    // 카테고리에 따른 무기/방어구 타입 옵션 제공
    const getWeaponOptions = () => {
      if (category === "무기") return JOB_WEAPONS[job] || ["전체"];
      if (category === "방어구") return ARMOR_TYPES;
      if (category === "액세서리") return ACCESSORY_TYPES;
      if (category === "특수장비") return SPECIALGEAR_TYPES;
      if (category === "칭호") return JOBSDETAIL;
      return ["전체"];
    };    
    
    const { data: iteminfo } = useItemName(query, grade);

       // 아이템 검색 실행
   const handleSearch = () => {
    if (!iteminfo?.rows) return;
    const filtered = iteminfo.rows.filter(item => {
      const matchCategory = (category === "전체") ||
        (category === "특수장비" && item.itemType === "추가장비") ||
        (category === "칭호" && item.itemTypeDetail === "칭호") ||
        item.itemType === category;
      const matchGrade = grade === "전체" || item.itemRarity === grade;
      return matchCategory && matchGrade;
    });
    setResults(filtered);
    setExpandedItemId(null);
  };

  return (
    <div className="row g-2 mb-4">
        <div className="col-md">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
            {CATEGORIES.map((c) => ( <option key={c}>{c}</option>))}
          </select>
        </div>

        <div className="col-md">
          <select value={job} onChange={(e) => setJob(e.target.value)} className="form-select" disabled={category !== "무기" && category !== "칭호"}>
          {(category === "무기" ? JOBS : category === "칭호" ? JOBSDETAIL : []).map(j => <option key={j}>{j}</option>)}
          </select>
        </div>

        <div className="col-md">
          <select value={weapon} onChange={(e) => setWeapon(e.target.value)} className="form-select" disabled={category === "칭호"}>
            {getWeaponOptions().map(w => <option key={w}>{w}</option>)}
          </select>
        </div>

        <div className="col-md">
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="form-select">
            {GRADES.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>

        <div className="col-md">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="아이템 이름" className="form-control" />
        </div>

        <div className="col-md-auto">
          <button onClick={handleSearch} className="btn btn-primary w-100">검색</button>
        </div>
      </div>

  )
}

export default Filter
