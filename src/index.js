import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 전역 스타일

import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';


// React Query 클라이언트 생성
const queryClient = new QueryClient();

// 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);

