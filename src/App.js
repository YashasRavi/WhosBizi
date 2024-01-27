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
import CurrentData from "./pages/CurrentData"
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

          {/* Sign-in Page - allows users to sign in. */}
          <Route path="index" element={<Index />} />

          {/* Profile Page (requires input parameters from Sign-in Page.) - allows users to see when their friends are free. */}
          <Route path="profile" element={<UserProfile />} />

          {/* Chat Page (requires input parameters from Profile Page using the useLocation() hook) - allows users to communicate with other users. */}
          <Route path="chat" element={<Chat />} />

          {/* Add Data Page - allows users to add default data. */}
          <Route path="addData" element={<AddData />} />

          {/* Edit Details Page - allows users to edit account preferences. */}
          <Route path="editDetails" element={<EditDetails />} />
          
          {/* Help Page - allows users to gain more guidance regarding how to use the application. */}
          <Route path="help" element={<Help />} />

          {/* Current Data Page - allows users to add data regarding when they are free. */}
          <Route path="/currentData" element={<CurrentData />} />
        
        </Routes>
      
      </BrowserRouter>
    
    </div>
    
  );
}
export default App;
