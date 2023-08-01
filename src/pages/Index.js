import React, { Component } from 'react'
import {Button} from '@mui/material';
import {Card} from '@mui/material';
import {Container} from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import {useState, useEffect} from 'react'
import "./IndexStyle.css";

function Index() {

  // useState and functions for "More information" modal
  const [ModOpen, setModOpen] = useState(false);
  const handleModOpen = () => setModOpen(true);
  const handleModClose = () => setModOpen(false);

  // useState and functions for "Contact me" modal
  const [ConOpen, setConOpen] = useState(false);
  const handleConOpen = () => setConOpen(true);
  const handleConClose = () => setConOpen(false);

  // Styling for both modals
  const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'yellow',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    // Entire page
    <div style={{backgroundImage: "linear-gradient(45deg, #FA8072, yellow)"}}>
          {/* Modal for "More information" */}
          <Modal
            open={ModOpen}
            onClose={handleModClose}
            aria-labelledby="modal-modal-title"
          >
              {/* Information inside "More information" modal */}
              <Box sx={ModalStyle} /*id="warnModal"*/ >
                  <h6>
                      What is WhosBizi?
                  </h6>
                  <p>
                    WhosBizi dynamic web application made with ReactJS. The app allows user to create an account, add other users as friends, and add data regarding when they are free during the week. The user can also view when their friends are free, helping them plan hangouts and meetings with their friends.
                    <br></br>
                    <br></br>
                    The user's profile page enables the user to view which time and day their friends are free. The chat page allows the user to communicate with their friends. The Add data page displays a weekly calender, where users can enter data about when they are free for each day and time range.
                    <br></br>
                    <br></br>
                    I created WhosBizi because I had a hard time individually reaching out to all of my peers to find out when they are free every week, and organizing meet-ups with all of them. Since WhosBizi visually shows when all of the users' friends are free, the users would have a much easier time connecting with their peers every week!
                    <br></br>
                    <br></br>
                  </p>
              </Box>
          </Modal>

          {/* Modal for "Contact me" */}
          <Modal
            open={ConOpen}
            onClose={handleConClose}
            aria-labelledby="modal-modal-title"
          >
              {/* Information inside "Contact me" modal */}
              <Box sx={ModalStyle} /*id="warnModal"*/>
                  <h6>
                      Contact Me!
                  </h6>
                  <p>
                    You can use this page to contact me: 
                  </p>
                  <a href="https://yashasravi.github.io/contacts.html" target="_blank" noopener noreferrer>
                    <button>
                      Contact Me
                    </button>
                  </a>
              </Box>
          </Modal>

          {/* Header and title */}
          <h1 className="indexTitle">
              WhosBizi
          </h1>
          <h2 className="indexSubTitle">
              Created by Yashas Ravi
          </h2>

          {/* Grid layout for remaining page contents */}
          <Container>
            <Grid container style={{paddingTop: "20px", textAlign: "center"}}>
                {/* Leftmost grid column */}
                <Grid item xs={1} md={3} xl={4}></Grid>

                {/* Middle grid column (contains sign in box and buttons) */}
                <Grid item xs={10} md={6} xl={4}>
                    <Card className="card" style={{display:"flex", alignItems:"center", backgroundColor: "#FFF0F5", border:"3px solid black"}}>
                        <br></br>

                        {/* Title of card used for sign in box */}
                        <Typography variant="h4" style={{fontWeight: "bold", color: "#4B0082"}}>
                            Sign In!
                        </Typography>
                        <br></br>

                        {/* Form for username and password input */}
                        <div className="inputField">
                          <form noValid autoComplete="off">
                              <TextField label="Username" color="secondary" variant="outlined" style={{backgroundColor:"#FFF8DC"}}>
                              </TextField>
                          </form>
                          <br></br>
                          <form noValid autoComplete="off">
                              <TextField label="Password" color="secondary" variant="outlined" style={{backgroundColor:"#FFF8DC"}}>
                              </TextField>
                          </form>
                        </div>
                        <br></br>
                        <br></br>

                        {/* Sign in button and create account button (which makes new account with user inputs if one is not existent) */}
                        <div className="buttons">
                          <Button variant="contained" style={{marginBottom:"10px", backgroundColor:"purple"}}>Submit</Button>
                          <Typography style={{fontWeight: "bold", color: "purple"}}>OR</Typography>
                          <Button variant="contained" style={{marginTop:"10px",  backgroundColor:"purple"}}>Create New Account</Button>
                        </div>
                        <br></br>
                        <br></br>
                    </Card>

                    {/* "More information" and "Contact me" buttons */}
                    <br></br>
                    <br></br>
                    <button class="btn btn-primary" onClick={() => {{handleModOpen()}}}>MORE INFORMATION!</button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button class="btn btn-primary" onClick={() => {{handleConOpen()}}}>CONTACT ME!</button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                </Grid>

                {/* Rightmost grid column */}
                <Grid item xs={1} md={3} xl={4}></Grid>
            </Grid>
            
          </Container>
          
      </div>
  )
}

export default Index