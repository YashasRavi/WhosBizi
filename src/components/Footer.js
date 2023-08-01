import React from 'react'
import "./FooterStyle.css";
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Footer({type}) {

  /* 
    The type signifies what the current page is that Header is being used in, where 
    0 - Profile, 1 - AddData, 2 - EditDetails, 3 - Help 
  */
  let ty = type;

  // Bolds the link if the current page matches the link of the page in the Footer
  const boldTheLink = () => {
      if (ty == "0") {
        document.querySelector("#prof2").style.fontWeight = "bold";
      }
      else if (ty == "1") {
        document.querySelector("#add2").style.fontWeight = "bold";
      }
      else if (ty == "2") {
        document.querySelector("#edit2").style.fontWeight = "bold";
      }
      else if (ty == "3") {
        document.querySelector("#help2").style.fontWeight = "bold";
      }
  }

  // Makes sure the link is bolded when the page is opened, without any other functions having to occur beforehand (hence the [] parameter)
  useEffect ( () => {
    boldTheLink();
  }, [])

  return (
    // Entire page
    <div>

      {/* Card used to contain all information */}
      <div class="card text-white bg-dark">
          <div class="card-body" id="FooterBody">

              {/* Contains all the basic buttons */}
              <div>

                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="yellow" class="bi bi-house-door-fill" viewBox="0 0 16 16" id="FooterBtn">
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                </svg>

                {/* Link to About WhosBizi page (currently stored as Help page) */}
                <Link
                    style={{textDecoration: "none", color: "white"}}
                    to={"/help"}
                    state={{username: "", password: ""}}
                >
                  <button class="btn btn-warning" id="FooterBtn">
                    About WhosBizi
                  </button>
                </Link>  
                
                {/* Link to Contact Me page - directs user to Contacts page of Personal Website */}
                <a href="https://yashasravi.github.io/contacts.html" target="_blank" noopener noreferrer>
                  <button class="btn btn-warning" id="FooterBtn">
                    Contact Me
                  </button>
                </a>  
              </div>

              {/* Contains all the page buttons. Note that ALL links send username and password information to selected page (not implemented yet !!!)  */}
              <div id="theLinks">

                    {/* Link to Profile page */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/profile"}
                        state={{username: "", password: ""}}
                    >
                        <button class="btn btn-warning" id="FooterBtn">
                            <div id="prof2">Profile</div>
                        </button>
                    </Link>
                    
                    {/* Link to Add Data page */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/addData"}
                        state={{username: "", password: ""}}
                    >
                        <button class="btn btn-warning" id="FooterBtn">
                            <div id="add2">Add Data</div>
                        </button>
                    </Link>

                    {/* Link to Edit Details page */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/editDetails"}
                        state={{username: "", password: "", scr: 0}}
                    >
                        <button class="btn btn-warning" id="FooterBtn">
                            <div id="edit2">Edit Info</div>
                        </button>
                    </Link>       
                    
                    {/* Link to Help page */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/help"}
                        state={{username: "", password: ""}}
                    >  
                        <button class="btn btn-warning"  id="FooterBtn">
                            <div id="help2">Help</div>
                        </button>
                    </Link>
                    
                    {/* Link to Sign in page where user is logged out */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/index"}
                        state={{username: "", password: ""}}
                    >  
                        <button class="btn btn-light" id="FooterBtn">Logout</button>
                    </Link>
                    
              </div>

          </div>
      </div>
    </div>
  )
}

export default Footer