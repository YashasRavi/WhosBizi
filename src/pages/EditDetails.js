import React from 'react'
import { Container } from '@mui/material'
import {useState, useEffect} from 'react';
import {Button, Typography} from '@mui/material'
import { Link } from 'react-router-dom';
import {Modal} from '@mui/material'
import {Box} from '@mui/material'
import SearchFriends from '../components/SearchFriends';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import "./EditDetailsStyle.css";


function EditDetails() {

    /*
      Styling for the modals, where absolute positioning is used to place the modal in 
      the CENTER of the page.  
    */
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

    /* 
        useLocation hook to direct from any other page to the Edit Details page.
        Uses these parameters in the LINK to the Edit Details page:
            * to={"/editDetails"}
            * state={{username: "", password: "", scr: 3}}
        Currently, the "scr" attribute is extracted to determine to what section of the 
        page the auto-scroll would go to.
    */
    const location = useLocation();
    const {username, password, scr} = location.state;
    
    // Stores the value in "scr" in "scroll".
    let scroll = scr;

    /*
        doScroll() uses "scroll" to determine what section of the Edit Details page
        to scroll to.
    */
    const doScroll = () => {
        // Check if scroll value is 0.
        if (scroll == 0) {
            // If so, scroll to the section with account data and preferences.
            document.querySelector("#accountDetailsCard").scrollIntoView();
        }
        // Check if scroll value is 1.
        else if (scroll == 1) {
            // If so, scroll to the section where new friends can be added.
            document.querySelector("#stuffWithSearch").scrollIntoView();
        }
        // Check if scroll value is 2.
        else if (scroll == 2) {
            // If so, scroll to the section where new friends can be added.
            document.querySelector("#stuffWithSearch").scrollIntoView();
        }
        // Check if scroll value is not any of the other values.
        else {
            // If so, scroll to the section with account data and preferences (default).
            document.querySelector("#accountDetailsCard").scrollIntoView();
        }
    }

    /*
        The useEffect() here ensures that doScroll() occurs whenever the page is refreshed 
        (as indicated by the empty array parameter []).
    */
    useEffect (() => {
        doScroll();
    }, [])
    
    // uName represents the user's username entered in the input field. 
    const [uName, setUName] = useState("");

    // fName represents the user's first name entered in the input field. 
    const [fName, setFName] = useState("");

    // lName represents the user's last name entered in the input field. 
    const [lName, setLName] = useState("");

    // isSlider represents if the user always wants slider input when the AddData page opens.
    const [isSlider, setIsSlider] = useState(false);

    // isNotif represents if the user wants notifications or not.
    const [isNotif, setIsNotif] = useState(false);

    // isPub represents if the user wants to make his/her account public. Private means other people won't be able to find this account.
    const [isPub, setIsPub] = useState(false);

    // nowAge represents the age input the user enters (here, "r0" is the value of an option that does not exist, so the default entry is blank).
    const [nowAge, setNowAge] = useState("r0");

    // nowGen represents the gender input the user enters (here, "g0" is the value of an option that does not exist, so the default entry is blank).
    const [nowGen, setNowGen] = useState("g0");

    // nowBio represents the information user enters about him/herself.
    const [nowBio, setNowBio] = useState("");

    // disOpen indicates if the modal for disabling the account is open or not. 
    const [disOpen, setDisOpen] = useState(false);

    // handleDisOpen opens the modal for disabling the account. 
    const handleDisOpen = () => setDisOpen(true);

    // handleDisClose close the modal for disabling the account. 
    const handleDisClose = () => setDisOpen(false);

    // delOpen indicates if the modal for deleting the account is open or not. 
    const [delOpen, setDelOpen] = useState(false);

    // handleDelOpen opens the modal for deleting the account. 
    const handleDelOpen = () => setDelOpen(true);

    // handleDelClose close the modal for deleting the account. 
    const handleDelClose = () => setDelOpen(false);

    /*
      saveProfileInfo() saves all of the information entered in the account details and 
      preferences section.
    */
    const saveProfileInfo = () => {
        /* {SAVE ALL INFO TO DATABASE} */
        alert("Your details have been saved!")
    }

    /*
        changeTheThing() uses "inp" (a boolean) and "code" (a number) to determine what
        setter function (determined by "code") to call and use it to change the state to
        "inp". 
    */
    const changeTheThing = (inp, code) => {
        // Changes username.
        if (code == 0) {
            setUName(inp);
        }
        // Changes first name.
        else if (code == 1) {
            setFName(inp);
        }
        // Changes last name.
        else if (code == 2) {
            setLName(inp);
        }
        // Change slider input option.
        else if (code == 3) {
            setIsSlider(inp);
        }
        // Changes option to recieve notifications.
        else if (code == 4) {
            setIsNotif(inp);
        }
        // Changes account publicity.
        else if (code == 5) {
            setIsPub(inp);
        }
        // Changes user age input.
        else if (code == 6) {
            setNowAge(inp);
        }
        // Changes user gender input.
        else if (code == 7) {
            setNowGen(inp);
        }
        // Changes other details input from user.
        else if (code == 8) {
            setNowBio(inp);
        }
        // Else, abort the function.
        else {
            return;
        }
    }

    /*
        returnTheThing() returns the text to be used in the "Slider Input", "Notifications",
        and "Public" buttons based on what the values of the state currently are.
    */
    const returnTheThing = (code) => {
        // If "code" = 3, then change the text in the "Slider Input" button.
        if (code == 3) {
            // If Sliders are not default, give user option to make Sliders the default input.
            if (isSlider == false) {
                return "Switch to Sliders";
            }
            // If Sliders are default, give user option to make text the default input.
            else {
                return "Switch to Text";
            }
        }

        // If "code" = 4, then change the text on the "Notifications" button.
        else if (code == 4) {
            // If notifications are off, give user option to turn on notifications.
            if (isNotif == false) {
                return "Turn on";
            }
            // If notifications are on, give user option to turn of notifications.
            else {
                return "Turn off";
            }
        }

        // If "code" = 5, change the text on the "Public" button.
        else if (code == 5) {
            // If the account is Private, give user option to switch to a Public account.
            if (isPub == false) {
                return "Switch to Public";
            }
            // If the account is Public, give user option to switch to a Private account.
            else {
                return "Switch to Private";
            }
        }
    }

  return (
    <div style={{backgroundImage: "linear-gradient(45deg, #FA8072, yellow)"}}>
        <Modal
            open={disOpen}
            onClose={handleDisClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={ModalStyle} id="warnModal">
                <h6>
                    Are you sure you want to disable your account?
                </h6>
                <br></br>
                <div>
                    <button class="btn btn-dark">
                        <Link
                            style={{textDecoration: "none", color: "white"}}
                            to={"/index"}
                            state={{username: "", password: ""}}
                        >
                            Disable Account
                        </Link>
                    </button>
                </div>
            </Box>
        </Modal>

        <Modal
            open={delOpen}
            onClose={handleDelClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={ModalStyle} id="warnModal">
                <h6>
                    Are you sure you want to delete your account?
                </h6>
                <br></br>
                <div>
                    <button class="btn btn-danger">
                        <Link
                            style={{textDecoration: "none", color: "white"}}
                            to={"/index"}
                            state={{username: "", password: ""}}
                        >
                            Delete Account
                        </Link>
                    </button>
                </div>

            </Box>
        </Modal>

        <div style={{position: "fixed", width: "100%", zIndex: "10", boxShadow: "2px 2px 3px 4px"}}>
          <Header type="2"></Header>
        </div>

        <Container id="wholeContainer">
            <div id = "pageContainer">
                <h2 className="headerText" align="center">
                    My Account
                </h2>
                <br></br>
                <br></br>
                <button class="btn btn-dark">
                    Click for Help!
                </button>
                <br></br>
                <br></br>
                <div class="card text-white bg-dark" id = "accountDetailsCard">
                    <div class="card-body" id="accountDetailsCardBody">
                        <div id="bigsect">
                            <div id="sect">
                                <h5 class="card-title">Account Details</h5>
                                <p class="card-text">Enter your basic account details.</p>
                                <form>
                                    <label>Username:</label>
                                    <br></br>
                                    <input type="text" style={{width: "150px"}} onChange={(e) => {changeTheThing(e.target.value, 0)}}></input>
                                    <br></br>
                                    <br></br>
                                    <label>First Name:</label>
                                    <br></br>
                                    <input type="text" style={{width: "150px"}} onChange={(e) => {changeTheThing(e.target.value, 1)}}></input>
                                    <br></br>
                                    <br></br>
                                    <label>Last Name:</label>
                                    <br></br>
                                    <input type="text" style={{width: "150px"}} onChange={(e) => {changeTheThing(e.target.value, 2)}}></input>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                </form>
                            </div>
                            <div id="sect">
                                <h5 class="card-title">Preferences</h5>
                                <p class="card-text">Enter your preferences.</p>
                                
                                    <label>Data Entry Mode:</label>
                                    <button class="btn btn-primary" id="entryOptions" onClick={() => {changeTheThing(!isSlider, 3)}}>
                                        {returnTheThing(3)}
                                    </button>
                                    <br></br>
                                    <label>Recieve Notifications:</label>
                                    <button class="btn btn-success" id="entryOptions" onClick={() => {changeTheThing(!isNotif, 4)}}>
                                        {returnTheThing(4)}
                                    </button>
                                    <br></br>
                                    <label>Account Privacy:</label>
                                    <button class="btn btn-danger" id="entryOptions" onClick={() => {changeTheThing(!isPub, 5)}}>
                                        {returnTheThing(5)}
                                    </button>
                                    
                                    <br></br>
                                    <br></br>
                                
                            </div>
                        </div>
                        <div id="bigsect">
                            <div id="sect">
                                <h5 class="card-title">Optional Data</h5>
                                <p class="card-text">Enter additional info!</p>
                                <label for="age">Age:</label>
                                <select name="age" id="Dropdown" value={nowAge} onChange={(e) => {changeTheThing(e.target.value, 6)}}>
                                    <option value="r0" style={{display: "none"}}></option>
                                    <option value="r1">1-20</option>
                                    <option value="r2">21-40</option>
                                    <option value="r3">41-60</option>
                                    <option value="r4">61-80</option>
                                    <option value="r5">80+</option>
                                </select>
                                <br></br>
                                <label for="gender">Gender:</label>
                                <select name="gender" id="Dropdown" value={nowGen} onChange={(e) => {changeTheThing(e.target.value, 7)}}>
                                    <option value="g0" style={{display: "none"}}></option>
                                    <option value="g1">Male</option>
                                    <option value="g2">Female</option>
                                    <option value="g3">Other</option>
                                </select>
                                <br></br>
                                <label>Bio:</label>
                                <textarea name="Text1" cols="20" rows="3" id="Dropdown" style={{resize:"none"}} onChange={(e) => {changeTheThing(e.target.value, 8)}}></textarea>
                                <br></br>
                            </div>
                            <div id="sect">
                                <h5 class="card-title">Danger Zone</h5>
                                <p class="card-text">Be careful here!</p>
                            
                                <br></br>
                                <button class="btn btn-secondary" onClick={() => {handleDisOpen()}}>
                                    Disable Account
                                </button>
                                <br></br>
                                <button class="btn btn-danger" onClick={() => {handleDelOpen()}}>
                                    Delete Account
                                </button>
                                <br></br>
                                <br></br>
                                <br></br>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                                </svg>
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                    <div id="sect">
                        <button class="btn btn-warning" id="saveAll" onClick={() => {saveProfileInfo()}}>
                            Save Information!
                        </button>
                    </div>
                    <br></br>
                </div>
                
                <br></br>
                <br></br>

                <div class = "alert alert-dark bg-dark" id="btnForDefaultData">
                    <Link
                        style={{textDecoration: "none", color: "white"}}
                        to={"/addData"}
                        state={{username: "", password: "", scr: 10}}
                    >
                        <button class = "btn btn-warning btn-lg">
                            <strong>
                                Enter Default Data
                            </strong>
                        </button>
                    </Link>
                </div>

                <br></br>
                <br></br>

                <div id="stuffWithSearch">
                    <SearchFriends></SearchFriends>
                </div>

                <br></br>
                <br></br>
            </div>
        </Container>
        <Footer type="2"></Footer>
    </div>
  )
}

export default EditDetails