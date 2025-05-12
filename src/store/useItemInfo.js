import { create } from "zustand";


const useItemInfo = create((set) => ({
    category: "전체",
    job : "전체",
    weapon : "전체",
    grade : "전체",
    query : "",
    results : [],
    expandedItemId : null,
    CATEGORIES : ["전체", "무기", "방어구","액세서리","특수장비", "칭호" ],
    JOBS :["전체", "귀검사/다크나이트/나이트", "격투가", "거너", "프리스트", "마법사/크리에이터", "도적", "마창사", "총검사", "아처"],
    JOBSDETAIL :  ["전체", "귀검사(남)","귀검사(여)", "격투가(남)","격투가(여)", "거너(남)","거너(여)", "프리스트(남)","프리스트(여)", "마법사(남)","마법사(여)", "도적","나이트", "마창사", "총검사","다크나이트","크리에이터", "아처"],
    JOB_WEAPONS: {
        전체: ["전체"],
        "귀검사/다크나이트/나이트": ["전체","소검", "도", "둔기", "대검", "광검"],
        격투가: ["전체","너클", "건틀릿", "클로", "권투글로브", "통파"],
        거너: ["전체", "리볼버", "자동권총", "머스켓", "핸드캐넌", "보우건"],
        프리스트: ["전체", "십자가","염주", "토템", "낫", "배틀액스"],
        "마법사/크리에이터": ["전체","창", "봉", "로드", "스탭", "빗자루"],
        도적: ["전체", "단검", "쌍검", "완드", "차크라 웨펀"],
        마창사: ["전체", "장창", "미늘창", "광창", "투창"],
        총검사: ["전체", "장도", "소태도", "중검", "코어블레이드"],
        아처: ["전체", "선현궁", "장궁", "크로스슈터", "에테리얼 보우"],
      },
    ARMOR_TYPES :["전체", "상의", "머리어께","하의","신발","벨트"],
    GRADES : ["전체", "커먼", "언커먼", "레어","유니크","에픽", "레전더리","태초"],
    ACCESSORY_TYPES : ["전체", "목걸이", "반지","팔찌"],
    SPECIALGEAR_TYPES : ["보조장비", "마법석" , "귀걸이"],
    setCategory: (category) =>set({category}),
    setJob: (job) => set({job}),
    setWeapon : (weapon) => set({weapon}),
    setGrade : (grade) => set({grade}),
    setQuery : (query) => set({query}),
    setResults : (results) => set({results}),
    setExpandedItemId : (expandedItemId) => set({expandedItemId}),


}))

export default useItemInfo