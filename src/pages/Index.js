import React, { Component } from 'react'
import {Button} from '@mui/material';
import {Card} from '@mui/material';
import {Container} from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import InfoModal from '../components/InfoModal';
import ContactModal from '../components/ContactModal';
import "./IndexStyle.css";

export class Index extends Component {
  render() {
      
    return (
        
      <div style={{backgroundImage: "linear-gradient(45deg, #FA8072, yellow)"}}>
          {/*<Button variant="contained">Hello World</Button>*/}
          <h1 className="indexTitle">
              WhosBizi
          </h1>

          <Container>
            <Grid container style={{paddingTop: "20px", textAlign: "center"}}>
                <Grid item xs={1} md={3} xl={4}></Grid>
                <Grid item xs={10} md={6} xl={4}>
                    <Card className="card" style={{display:"flex", alignItems:"center", backgroundColor: "#FFF0F5", border:"3px solid black"}}>
                        <br></br>
                        <Typography variant="h4" style={{fontWeight: "bold", color: "#4B0082"}}>
                            Sign In!
                        </Typography>
                        <br></br>
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
                        <div className="buttons">
                          <Button variant="contained" style={{marginBottom:"10px", backgroundColor:"purple"}}>Submit</Button>
                          <Typography style={{fontWeight: "bold", color: "purple"}}>OR</Typography>
                          <Button variant="contained" style={{marginTop:"10px",  backgroundColor:"purple"}}>Create New Account</Button>
                        </div>
                        <br></br>
                        <br></br>
                    </Card>
                    <br></br>

                    <InfoModal></InfoModal>
                    <ContactModal></ContactModal>
                    <br></br>


                </Grid>
                <Grid item xs={1} md={3} xl={4}></Grid>
            </Grid>
            
          </Container>
          
      </div>
    )
  }
}

export default Index