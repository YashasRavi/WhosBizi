import React from 'react'
import "./HeaderStyle.css";
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';

function Header({type}) {
  
  /* 
    The type signifies what the current page is that Header is being used in, where 
    0 - Profile, 1 - AddData, 2 - EditDetails, 3 - Help 
  */
  let ty = type;

  // Bolds the link if the current page matches the link of the page in the Header
  const boldTheLink = () => {
      if (ty == "0") {
        document.querySelector("#prof").style.fontWeight = "bold";
      }
      else if (ty == "1") {
        document.querySelector("#add").style.fontWeight = "bold";
      }
      else if (ty == "2") {
        document.querySelector("#edit").style.fontWeight = "bold";
      }
      else if (ty == "3") {
        document.querySelector("#help").style.fontWeight = "bold";
      }
  }

  // Makes sure the link is bolded when the page is opened, without any other functions having to occur beforehand (hence the [] parameter)
  useEffect ( () => {
    boldTheLink();
  }, [])
  
  
  return (

    // Entire page
    <div id="entireHeader" style={{backgroundColor: "black"}}>

        {/* Card containing Header contents */}
        <div class="card text-white bg-dark">
            <div class="card-body" id="headerBody">

                {/* Title of header which is WhosBizi */}
                <h3 id="headerTitle" style={{color: "yellow"}}>
                    WhosBizi
                </h3>

                {/* Links to all of the pages. Note that ALL links send username and password information to selected page (not implemented yet !!!) */}
                <nav id="headerLinks">

                    {/* Link to Profile page */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/profile"}
                        state={{username: "", password: ""}}
                    >
                        <button class="btn btn-warning" id="oneLink">
                            <div id="prof">Profile</div>
                        </button>
                    </Link>
                    
                    {/* Link to Current Data page */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/currentData"}
                        state={{username: "", password: ""}}
                    >
                        <button class="btn btn-warning" id="oneLink">
                            <div id="add">My Data</div>
                        </button>
                    </Link>

                    {/* Link to Edit Details page */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/editDetails"}
                        state={{username: "", password: "", scr: 0}}
                    >
                        <button class="btn btn-warning" id="oneLink">
                            <div id="edit">Edit Info</div>
                        </button>
                    </Link>       
                    
                    {/* Link to Help page */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/help"}
                        state={{username: "", password: ""}}
                    >  
                        <button class="btn btn-warning"  id="oneLink">
                            <div id="help">Help</div>
                        </button>
                    </Link>
                    
                    {/* Link to Sign in page where user is logged out */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/index"}
                        state={{username: "", password: ""}}
                    >  
                        <button class="btn btn-light" id="oneLink">Logout</button>
                    </Link>
                    
                </nav>
                
            </div>
        </div>
    </div>
  )
}

export default Header