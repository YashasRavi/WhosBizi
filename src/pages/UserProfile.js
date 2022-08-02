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
  constructor(props) {
    super(props);
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

    this.friends = [this.friend1, this.friend2, this.friend3, this.friend4, this.friend5, this.friend6];
  }

  render() {
    return (
      <div style={{backgroundImage: "linear-gradient(45deg, #FA8072, yellow)", backgroundRepeat:"repeat", backgroundSize:"cover", backgroundPosition:"center"}}>
        <div style={{position: "fixed", width: "100%", zIndex: "10", boxShadow: "2px 2px 3px 4px"}}>
          <Header type="0"></Header>
        </div>
      
        <Container id="wholeContainer">
            <h2 className="headerText" align="center">
                Welcome, {this.username}
            </h2>
            <Grid container style={{paddingTop: "20px", textAlign: "center"}}>
                <Grid item xs={0.4} md={1} xl={1}></Grid>
                <Grid item xs={11.2} md={10} xl={10}>
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
                    <Typography style={{textDecoration:"underline", fontFamily: "Monospace", fontWeight:"bold", fontSize:"20px", color: "#4B0082"}}>
                      When your friends are free:
                    </Typography>
                    <br></br>
                    <div class="card text-white bg-dark">
                        <div class="card-body">
                            <h5 style={{color: "yellow"}}>
                              Color Scheme:
                            </h5>
                            <br></br>
                            <p id="altLabel" style={{color: "red"}}>Fully Busy/Unavailable</p>
                            <div id="tableColorGradient"></div>
                            <p id="altLabel" style={{color: "lightblue"}}>Fully Free/Available</p>
                            <div id="gradLabels">
                                <p style={{color: "red"}}>Fully Busy/Unavailable</p>
                                <p style={{color: "lightblue"}}>Fully Free/Available</p>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="fGrid">
                      <FriendGrid array={this.friends}></FriendGrid>
                    </div>
                    
                    <br></br>
                    <div className = "twoButtons">
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
                    <Typography style={{textDecoration:"underline", fontFamily: "Monospace", fontWeight:"bold", fontSize:"20px", color: "#4B0082"}}>
                      Who's free at what times:
                    </Typography>
                    <br></br>
                    <div class="card" style={{border: "4px solid black"}}>
                        <div class="card-body">
                            <h5 style={{color: "black"}}>
                              Color Scheme:
                            </h5>
                            <br></br>
                            <p id="altLabel" style={{color: "darkred"}}>More free friends</p>
                            <div id="tableColorGradient2"></div>
                            <p id="altLabel" style={{color: "#FF1493"}}>Less free friends</p>
                            <div id="gradLabels">
                                <p style={{color: "darkred"}}>More free friends</p>
                                <p style={{color: "#FF1493"}}>Less free friends</p>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <Calendar array={this.friends}></Calendar>
                    <br></br>
                    <br></br>
                </Grid>
                <Grid item xs={0.4} md={1} xl={1}></Grid>
            </Grid>
        </Container>
        <Footer type="0"></Footer>
      </div>
    )
  }
}

export default UserProfile