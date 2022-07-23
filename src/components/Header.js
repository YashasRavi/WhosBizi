import React from 'react'
import "./HeaderStyle.css";
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';

function Header({type}) {
  
  let ty = type;

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

  useEffect ( () => {
    boldTheLink();
  }, [])
  
  
  return (
    <div id="entireHeader" style={{backgroundColor: "black"}}>
        <div class="card text-white bg-dark">
            <div class="card-body" id="headerBody">
                <h3 id="headerTitle" style={{color: "yellow"}}>
                    WhosBizi
                </h3>
                <nav id="headerLinks">
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/profile"}
                        state={{username: "", password: ""}}
                    >
                        <button class="btn btn-warning" id="oneLink">
                            <div id="prof">Profile</div>
                        </button>
                    </Link>
                    
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/addData"}
                        state={{username: "", password: ""}}
                    >
                        <button class="btn btn-warning" id="oneLink">
                            <div id="add">Add Data</div>
                        </button>
                    </Link>

                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/editDetails"}
                        state={{username: "", password: "", scr: 0}}
                    >
                        <button class="btn btn-warning" id="oneLink">
                            <div id="edit">Edit Info</div>
                        </button>
                    </Link>       
                    

                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/help"}
                        state={{username: "", password: ""}}
                    >  
                        <button class="btn btn-warning"  id="oneLink">
                            <div id="help">Help</div>
                        </button>
                    </Link>
                    
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