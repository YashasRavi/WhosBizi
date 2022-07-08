import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/Index'
import UserProfile from './pages/UserProfile'
import Chat from './pages/Chat'
import AddData from './pages/AddData';
import EditDetails from './pages/EditDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Button} from '@mui/material';
import {Container} from '@mui/material';

//App Page for Router

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
          <Route path="editDetails" element={<EditDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}
export default App;
