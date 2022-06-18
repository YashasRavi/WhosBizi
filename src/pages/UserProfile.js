import React, { Component } from 'react'
import {Button} from '@mui/material';
import {Card} from '@mui/material';
import {Container} from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import FriendGrid from '../components/FriendGrid';
import Calendar from '../components/Calender';
import "./UserProfileStyle.css";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.friend1 = {
      id: 1, 
      MaxId: 7,
      username:"p1",
      firstname:"f1",
      lastname:"l1",
      block:false, 
      blocked:false,
      data: [
        [20, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
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
      username:"p2",
      firstname:"f2",
      lastname:"l2",
      block:false, 
      blocked:false,
      data: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
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
      username:"p3",
      firstname:"f3",
      lastname:"l3", 
      block:false,
      blocked:false,
      data: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ],
      messages: []
    };
    
    this.friend4 = {
      id: 4,
      username:"p4",
      firstname:"f4",
      lastname:"l4",
      block:false, 
      blocked:false,
      MaxId: 4,
      data: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
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
      username:"p5",
      firstname:"f5",
      lastname:"l5",
      block:false, 
      blocked:false,
      data: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
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
      username:"p6",
      firstname:"f6",
      lastname:"l6",
      block:false, 
      blocked:false,
      data: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ],
      messages: []
    };  

    this.friends = [this.friend1, this.friend2, this.friend3, this.friend4, this.friend5, this.friend6];
  }

  render() {
    return (
      <div style={{backgroundImage: "linear-gradient(45deg, #FA8072, yellow)", backgroundRepeat:"repeat", backgroundSize:"cover", backgroundPosition:"center"}}>
        <Container>
            <h2 className="headerText" align="center">
                Welcome, [Name]
            </h2>
            <Grid container style={{paddingTop: "20px", textAlign: "center"}}>
                <Grid item xs={0.4} md={1} xl={1}></Grid>
                <Grid item xs={11.2} md={10} xl={10}>
                    <Button variant="contained" style={{marginTop:"10px", marginBottom:"10px", backgroundColor:"purple"}}>Edit Account Details</Button> 
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Typography style={{textDecoration:"underline", fontFamily: "Monospace", fontWeight:"bold", fontSize:"20px", color: "#4B0082"}}>
                      When your friends are free:
                    </Typography>
                    <br></br>
                    <div className="fGrid">
                      <FriendGrid array={this.friends}></FriendGrid>
                    </div>
                    
                    <br></br>
                    <div className = "twoButtons">
                      <Button variant="contained">
                        <Typography>
                          Enter when you're free!
                        </Typography>
                      </Button>
                      <br></br>
                      <Button variant="contained">
                        <Typography>
                          + Add friends!
                        </Typography>
                      </Button>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Typography style={{textDecoration:"underline", fontFamily: "Monospace", fontWeight:"bold", fontSize:"20px", color: "#4B0082"}}>
                      Who's free at what times:
                    </Typography>
                    <br></br>
                    <Calendar array={this.friends}></Calendar>
                    <br></br>
                    <br></br>
                </Grid>
                <Grid item xs={0.4} md={1} xl={1}></Grid>
            </Grid>
        </Container>
        
      </div>
    )
  }
}

export default UserProfile