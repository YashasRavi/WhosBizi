import React from 'react'
import "./FooterStyle.css";
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Footer({type}) {
  let ty = type;

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

  useEffect ( () => {
    boldTheLink();
  }, [])

  return (
    <div>
      <div class="card text-white bg-dark">
          <div class="card-body" id="FooterBody">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="yellow" class="bi bi-house-door-fill" viewBox="0 0 16 16" id="FooterBtn">
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                </svg>
                <Link
                    style={{textDecoration: "none", color: "white"}}
                    to={"/help"}
                    state={{username: "", password: ""}}
                >
                  <button class="btn btn-warning" id="FooterBtn">
                    About WhosBizi
                  </button>
                </Link>  
                
                <Link
                    style={{textDecoration: "none", color: "white"}}
                    to={"/help"}
                    state={{username: "", password: ""}}
                >
                  <button class="btn btn-warning" id="FooterBtn">
                    Contact Us
                  </button>
                </Link>  
              </div>
              <div id="theLinks">
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/profile"}
                        state={{username: "", password: ""}}
                    >
                        <button class="btn btn-warning" id="FooterBtn">
                            <div id="prof2">Profile</div>
                        </button>
                    </Link>
                    
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/addData"}
                        state={{username: "", password: ""}}
                    >
                        <button class="btn btn-warning" id="FooterBtn">
                            <div id="add2">Add Data</div>
                        </button>
                    </Link>

                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/editDetails"}
                        state={{username: "", password: "", scr: 0}}
                    >
                        <button class="btn btn-warning" id="FooterBtn">
                            <div id="edit2">Edit Info</div>
                        </button>
                    </Link>       
                    

                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/help"}
                        state={{username: "", password: ""}}
                    >  
                        <button class="btn btn-warning"  id="FooterBtn">
                            <div id="help2">Help</div>
                        </button>
                    </Link>
                    
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