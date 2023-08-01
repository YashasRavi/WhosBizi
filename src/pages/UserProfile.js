import React, { Component } from 'react'
import {Button} from '@mui/material';
import {Card} from '@mui/material';
import {Container} from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import FriendGrid from '../components/FriendGrid';
import Calendar from '../components/Calender';
import "./UserProfileStyle.css";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export class UserProfile extends Component {
  
  /*
    Constructor assigns the following data for the current user:
      - First name
      - Last name
      - Username
      - Password
      - maxEntry (???)
      - Friends array contaning data about every friend. This data contains: 
        * ID of friend
        * maxID of friend (???)
        * Firstname
        * Lastname
        * Username
        * If current user has blocked this friend (blocked)
        * If the friend has blocked this current user (block)
        * Data regarding when the friend is free
        * Messages to the friend, each with ID, from, to, and the content. 
      - Data for when the user is free (the myData array starts from TODAY and goes 7 days after)
      - Default data (when default data field is EMPTY, then the myData field takes over)
    
    NOTE: the props do not matter since nothing is passed as a property into the HTML call of UserProfile in App.js.

  */

  constructor(props) {
    super(props);
    this.firstname = "FIRSTNAME"
    this.lastname = "LASTNAME"
    this.username = "USERNAME";
    this.password = "";
    this.maxEntry = 10;

    this.myData = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    this.myDefaults = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    this.friend0 = {
      id: 0,
      MaxId: 0,
      username: "dummy_user",
      firstname: "dummy_first",
      lastname: "dummy_last",
      block: false,
      blocked: false,
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      messages: []
    };

    this.friend1 = {
      id: 1, 
      MaxId: 7,
      username:"john",
      firstname:"f1",
      lastname:"l1",
      block:false, 
      blocked:false,
      data: [
        [0.5, 0.3, 0.6, 0.7, 0.2, 0.7, 0.9, 0.1, 0.8, 0.8, 0.8, 0.8, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      messages: [
        {
            id: 1,
            from: "Me",
            to: "p1",
            msg: "Yo whats up"
        },
        {
            id: 2,
            from: "p1",
            to: "Me",
            msg: "I'm good hbu"
        },
        {
            id: 3,
            from: "Me",
            to: "p1",
            msg: "I'M good and what did u eat"
        },
        {
            id: 4,
            from: "p1",
            to: "Me",
            msg: "pork hbu"
        },
        {  
            id: 5,
            from: "Me",
            to: "p1",
            msg: "sauce"
        },
        {
            id: 6,
            from: "p1",
            to: "Me",
            msg: "pork hbu"
        },
        {
            id: 7,
            from: "Me",
            to: "p1",
            msg: "sauce"
        }
      ]
    };
    
    this.friend2 = {
      id: 2,
      MaxId: 7,
      username:"henry",
      firstname:"f2",
      lastname:"l2",
      block:false, 
      blocked:false,
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      messages: [
        {
          id: 1,
          from: "Me",
          to: "p1",
          msg: "Yo whats up"
        },
        {
            id: 2,
            from: "p1",
            to: "Me",
            msg: "I'm good hbu"
        },
        {
            id: 3,
            from: "Me",
            to: "p1",
            msg: "I'M good and what did u eat"
        },
        {
            id: 4,
            from: "p1",
            to: "Me",
            msg: "pork hbu"
        },
        {  
            id: 5,
            from: "Me",
            to: "p1",
            msg: "sauce"
        },
        {
            id: 6,
            from: "p1",
            to: "Me",
            msg: "pork hbu"
        },
        {
            id: 7,
            from: "Me",
            to: "p1",
            msg: "sauce"
        }
      ]
    };
    
    this.friend3 = {
      id: 3,
      MaxId: 0,
      username:"mickey",
      firstname:"f3",
      lastname:"l3", 
      block:false,
      blocked:false,
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      messages: []
    };
    
    this.friend4 = {
      id: 4,
      username:"thorodinson",
      firstname:"f4",
      lastname:"l4",
      block:false, 
      blocked:false,
      MaxId: 4,
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      messages: [
        {
            id: 1,
            from: "Me",
            to: "p4",
            msg: "Yo"
        },
        {
            id: 2,
            from: "p4",
            to: "Me",
            msg: "go away bruh"
        },
        {
            id: 3,
            from: "Me",
            to: "p4",
            msg: "huh"
        },
        {
            id: 4,
            from: "p4",
            to: "Me",
            msg: "I am gonna remove u as a friend cuz like you annoy me way too much homie."
        }
      ]
    };
    
    this.friend5 = {
      id: 5,
      MaxId: 2,
      username:"doctorstrange",
      firstname:"f5",
      lastname:"l5",
      block:false, 
      blocked:false,
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      messages: [
        {
          id: 1,
          from: "Me",
          to: "p4",
          msg: "Yo"
        },
        {
          id: 2,
          from: "p4",
          to: "Me",
          msg: "go away bruh"
        }
      ]
    };
    
    this.friend6 = {
      id: 6,
      MaxId: 0,
      username:"harrypotter",
      firstname:"f6",
      lastname:"l6",
      block:false, 
      blocked:false,
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      messages: []
    };  

    this.friends = [this.friend0, this.friend1, this.friend2, this.friend3, this.friend4, this.friend5, this.friend6];
  }

  render() {
    return (
      
      // The entire page (background is a linear gradient)
      <div style={{backgroundImage: "linear-gradient(45deg, #FA8072, yellow)", backgroundRepeat:"repeat", backgroundSize:"cover", backgroundPosition:"center"}}>
        
        {/* Header - contains all of the links like "Add Data" and "Edit Info" */}
        <div style={{position: "fixed", width: "100%", zIndex: "10", boxShadow: "2px 2px 3px 4px"}}>

          {/* Header call, where type = 0 signifies User Profile page */}
          <Header type="0"></Header>

        </div>

        {/* Container that encloses a grid which has all the main content */}
        <Container id="wholeContainer">

            {/* The "Welcome username" text on the top */}
            <h2 className="headerText" align="center">
                Welcome, {this.username}
            </h2>

            {/* Grid containing friend-grid, calender, andbuttons */}
            <Grid container style={{paddingTop: "20px", textAlign: "center"}}>

                {/* Leftmost grid column */}
                <Grid item xs={0.4} md={1} xl={1}></Grid>

                {/* Middle grid column, contains the main content */}
                <Grid item xs={11.2} md={10} xl={10}>

                    {/* Edit-Details button which links to /editDetails and CONTAINS username, password, and scr
                     information of CURRENT user. NOTE that scr: 0 means scroll to top of edit details page upon opening! */}
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/editDetails"}
                        state={{username: "", password: "", scr: 0}}
                    >
                        <Button variant="contained" style={{marginTop:"10px", marginBottom:"10px", backgroundColor:"purple"}}>Edit Account Details</Button> 
                    </Link>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    {/* Title for friend-grid */}
                    <Typography style={{textDecoration:"underline", fontFamily: "Monospace", fontWeight:"bold", fontSize:"20px", color: "#4B0082"}}>
                      When your friends are free:
                    </Typography>

                    <br></br>

                    {/* Box showing color scheme used in friend grid */}
                    <div class="card text-white bg-dark">

                        {/* Body of the card. */}
                        <div class="card-body">

                            {/* Title of color scheme box */}
                            <h5 style={{color: "yellow"}}>
                              Color Scheme:
                            </h5>

                            <br></br>

                            {/* Code for labels arranged so that small screen sizes have label-gradient-label (altLabel) 
                            and larger screen sizes have gradient and BOTH labels on bottom (gradLabel)  */}
                            <p id="altLabel" style={{color: "red"}}>Fully Busy/Unavailable</p>

                            {/* Gradient for friend grid */}
                            <div id="tableColorGradient"></div>

                            <p id="altLabel" style={{color: "lightblue"}}>Fully Free/Available</p>
                            
                            <div id="gradLabels">
                                <p style={{color: "red"}}>Fully Busy/Unavailable</p>
                                <p style={{color: "lightblue"}}>Fully Free/Available</p>
                            </div>

                        </div>
                    </div>

                    <br></br>
                    
                    {/* Friend-grid which uses the full friends array as a prop (meaning array = {this.friends}) */}
                    <div className="fGrid">
                      <FriendGrid array={this.friends}></FriendGrid>
                    </div>
                    
                    <br></br>
                    
                    {/* Contains Add Data and Add Friends buttons */}
                    <div className = "twoButtons">

                      {/* Add Data button linking to /addData with the link CONTAINING username and password of current user */}
                      <Button variant="contained">
                        <Link
                          style={{textDecoration: "none", color: "white"}}
                          to={"/addData"}
                          state={{username: "", password: ""}}
                        >
                          <Typography>
                            Enter when you're free!
                          </Typography> 
                        </Link>  
                      </Button>

                      <br></br>

                      {/* Add Friends button linking to /editDetails with the link CONTAINING username and password of current user
                      as well as scr: 2 which scrolls to the adding friends portion of EditDetails upon opening! */}
                      <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/editDetails"}
                        state={{username: "", password: "", scr: 2}}
                      >
                        <Button variant="contained" id="bottomBtn">
                          <Typography>
                            + Add friends!
                          </Typography>
                        </Button>
                      </Link>

                    </div>

                    <br></br>
                    <br></br>
                    <br></br>

                    {/* Title for calender */}
                    <Typography style={{textDecoration:"underline", fontFamily: "Monospace", fontWeight:"bold", fontSize:"20px", color: "#4B0082"}}>
                      Who's free at what times:
                    </Typography>

                    <br></br>
                    
                    {/* Card for color scheme used in calender */}
                    <div class="card" style={{border: "4px solid black"}}>
                        <div class="card-body">

                            {/* Header for color scheme card */}
                            <h5 style={{color: "black"}}>
                              Color Scheme:
                            </h5>

                            <br></br>

                            {/* Code for labels arranged so that small screen sizes have label-gradient-label (altLabel) 
                            and larger screen sizes have gradient and BOTH labels on bottom (gradLabel)  */}
                            <p id="altLabel" style={{color: "darkred"}}>More free friends</p>

                            {/* Gradient for calender */}
                            <div id="tableColorGradient2"></div>

                            <p id="altLabel" style={{color: "#FF1493"}}>Less free friends</p>
                            <div id="gradLabels">
                                <p style={{color: "darkred"}}>More free friends</p>
                                <p style={{color: "#FF1493"}}>Less free friends</p>
                            </div>

                        </div>
                    </div>

                    <br></br>
                    
                    {/* Calender which uses the full friends array as a prop (meaning array = {this.friends}) */}
                    <Calendar array={this.friends}></Calendar>

                    <br></br>
                    <br></br>

                </Grid>

                {/* Rightmost grid column */}
                <Grid item xs={0.4} md={1} xl={1}></Grid>

            </Grid>
        </Container>
        
        {/* Footer call, where type = 0 signifies User Profile page */}
        <Footer type="0"></Footer>

      </div>

    )
  }
}

export default UserProfile