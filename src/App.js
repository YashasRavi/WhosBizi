import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/Index'
import UserProfile from './pages/UserProfile'
import Chat from './pages/Chat'
import AddData from './pages/AddData';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Button} from '@mui/material';
import {Container} from '@mui/material';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="index" element={<Index />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="addData" element={<AddData />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}
export default App;
