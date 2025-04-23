
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import { Routes,Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterList from './pages/CharacterList/CharacterList';
import { useState } from 'react';
import CharacterDetails from './pages/CharacterDetails/CharacterDetails';

function App() {
  const [selectedServer,setSelectedServer] = useState("선택하세요");
  const [selectedServerId,setSelectedServerId] = useState("서버");
  const [selectedName, setSelectedName] = useState("");
  const encodeName = encodeURIComponent(selectedName);

  return (
      <Routes>
        <Route path="/" element={<AppLayout/>}> 
          < Route index element={<Homepage 
              selectedServer={selectedServer} setSelectedServer={setSelectedServer}
              selectedServerId={selectedServerId} setSelectedServerId={setSelectedServerId}
              selectedName={encodeName} setSelectedName={setSelectedName}/>}/>
          < Route path="servers/characters" element={<CharacterList
                selectedServer={selectedServer} setSelectedServer={setSelectedServer}
                selectedServerId={selectedServerId} setSelectedServerId={setSelectedServerId}
                selectedName={encodeName} setSelectedName={setSelectedName} 
                />} />
           <Route path="servers/characters/characterDetails" element={<CharacterDetails/>} />  
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
  );
}

export default App;
