import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/Index'
import UserProfile from './pages/UserProfile'
import Chat from './pages/Chat'
import AddData from './pages/AddData';
import EditDetails from './pages/EditDetails';
import Help from './pages/Help';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Button} from '@mui/material';
import {Container} from '@mui/material';

//App Page for Router
function App() {

  // Return the entire application.
  return (

    // Contains routing for the entire application.
    <div>

      {/* Stores navigation for routes of every page. */}
      <BrowserRouter>

        {/* Router containing the routes of every page. */}
        <Routes>

          {/* Default page. */}
          <Route path="/" element={<App />} />

          {/* Sign-in Page. */}
          <Route path="index" element={<Index />} />

          {/* Profile Page (requires input parameters from Sign-in Page.). */}
          <Route path="profile" element={<UserProfile />} />

          {/* Chat Page (requires input parameters from Profile Page using the useLocation() hook). */}
          <Route path="chat" element={<Chat />} />

          {/* Add Data Page. */}
          <Route path="addData" element={<AddData />} />

          {/* Edit Details Page. */}
          <Route path="editDetails" element={<EditDetails />} />
          
          {/* Hepl Page. */}
          <Route path="help" element={<Help />} />
        
        </Routes>
      
      </BrowserRouter>
    
    </div>
    
  );
}
export default App;
