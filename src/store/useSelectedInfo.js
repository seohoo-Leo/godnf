import { create } from 'zustand'


const useSelectedInfo = create((set)=>({
    selectedServer:"선택하세요",
    selectedServerId:"all",
    selectedName:"",
    setSelectedServer: (selectedServer) => set({selectedServer}),
    setSelectedServerId: (selectedServerId) =>set({selectedServerId}),
    setSelectedName: (selectedName) => set(encodeURIComponent({selectedName}))

}))

export default useSelectedInfo