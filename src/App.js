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

 

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* 홈 페이지 */}
        <Route index element={ <Homepage/>}/>
        {/* 캐릭터 리스트 페이지 */}
        <Route path="servers/characters" element={ <CharacterList/>}/>
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