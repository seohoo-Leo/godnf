import { Routes,Route } from 'react-router-dom';
import { useState } from 'react';

import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CharacterList from './pages/CharacterList/CharacterList';
import CharacterDetails from './pages/CharacterDetails/CharacterDetails';
import Auction from './pages/AuctionsPage/Auction';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedServer,setSelectedServer] = useState("선택하세요");
  const [selectedServerId,setSelectedServerId] = useState("all");
  const [selectedName, setSelectedName] = useState("");
 

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* 홈 페이지 */}
        <Route
          index
          element={
            <Homepage
              selectedServer={selectedServer}
              setSelectedServer={setSelectedServer}
              selectedServerId={selectedServerId}
              setSelectedServerId={setSelectedServerId}
              selectedName={encodeURIComponent(selectedName)} // URL 인코딩된 이름 전달
              setSelectedName={setSelectedName}
            />
          }
        />
        {/* 캐릭터 리스트 페이지 */}
        <Route
          path="servers/characters"
          element={
            <CharacterList
              selectedServer={selectedServer}
              setSelectedServer={setSelectedServer}
              selectedServerId={selectedServerId}
              setSelectedServerId={setSelectedServerId}
              selectedName={encodeURIComponent(selectedName)}
              setSelectedName={setSelectedName}
            />
          }
        />
        {/* 캐릭터 상세 */}
        <Route path="servers/characters/:characterId" element={<CharacterDetails />} />
        {/* 경매장 */}
        <Route path="auction" element={<Auction />} />
        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;