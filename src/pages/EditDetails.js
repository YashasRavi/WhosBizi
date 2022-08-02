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

    const location = useLocation();
    const {username, password, scr} = location.state;
    
    console.log(scr);
    let scroll = scr;
    const doScroll = () => {
        if (scroll == 0) {
            document.querySelector("#accountDetailsCard").scrollIntoView();
        }
        else if (scroll == 1) {
            document.querySelector("#stuffWithSearch").scrollIntoView();
        }
        else if (scroll == 2) {
            document.querySelector("#stuffWithSearch").scrollIntoView();
        }
        else if (scroll == 3) {
            document.querySelector("#defaultDataCardBody").scrollIntoView({behavior:"smooth"});
        }
        else {
            document.querySelector("#accountDetailsCard").scrollIntoView();
        }
    }

    useEffect (() => {
        doScroll();
    }, [])
    

    const [tabIndex, setTabIndex] = useState(0);

    const rightClick = () => {
        if (tabIndex < 6) {
            setTabIndex(tabIndex+1);
        }
    }
    
    const leftClick = () => {
        if (tabIndex > 0) {
            setTabIndex(tabIndex-1);
        }
    }
    
    const updateTableArrows = (tI) => {
    
        if (tI == 6) {
            document.querySelector("#rightArrow").style.opacity="50%";
        }
        else {
            document.querySelector("#rightArrow").style.opacity="100%";
        }
    
        if (tI == 0) {
            document.querySelector("#leftArrow").style.opacity="50%";
        }
        else {
            document.querySelector("#leftArrow").style.opacity="100%";
        }
    } 

    useEffect (() => {
        updateTableArrows(tabIndex);
    }, [tabIndex])

    let Today = new Date();

    function retDate (date, offset) {
        const tod = date;
        const next = new Date(tod);
        next.setDate(tod.getDate()+offset);
        let current = next.getDay();
        if (current == 0) {
        return <h6>Sun, {next.getMonth()+1}/{next.getDate()}</h6>;
        }
        if (current == 1) {
        return <h6>Mon, {next.getMonth()+1}/{next.getDate()}</h6>;
        }
        if (current == 2) {
        return <h6>Tue, {next.getMonth()+1}/{next.getDate()}</h6>;
        }
        if (current == 3) {
        return <h6>Wed, {next.getMonth()+1}/{next.getDate()}</h6>;
        }
        if (current == 4) {
        return <h6>Thu, {next.getMonth()+1}/{next.getDate()}</h6>;
        }
        if (current == 5) {
        return <h6>Fri, {next.getMonth()+1}/{next.getDate()}</h6>;
        }
        if (current == 6) {
        return <h6>Sat, {next.getMonth()+1}/{next.getDate()}</h6>;
        }
    }

    let myDefaults = [
        [0.5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
      ];

      let cStates = [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false]
    ];

    let ToSave = [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]

    let origIsDaily = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

    let cDaily = [
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ]

    for (let d = 0; d < 7; d++) {
        for (let i = 0; i < 8; i++) {
    
          if (myDefaults[d][i*3] == myDefaults[d][1+i*3] && myDefaults[d][i*3] == myDefaults[d][2+i*3]) {
            cStates[d][i] = true;
          }
          else {
            cStates[d][i] = false;
          }
    
        }
      }

    const [nowDefaults, setNowDefaults] = useState(myDefaults);
    const [nowStates, setNowStates] = useState(cStates);
    const [nowDaily, setNowDaily] = useState(origIsDaily);
    const [checkDaily, setCheckDaily] = useState(cDaily);
    const [nowToSave, setSave] = useState(ToSave);

    const [uName, setUName] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

    const [isSlider, setIsSlider] = useState(false);
    const [isNotif, setIsNotif] = useState(false);
    const [isPub, setIsPub] = useState(false);

    const [nowAge, setNowAge] = useState("r0");
    const [nowGen, setNowGen] = useState("r1");
    const [nowBio, setNowBio] = useState("");

    const [disOpen, setDisOpen] = useState(false);
    const handleDisOpen = () => setDisOpen(true);
    const handleDisClose = () => setDisOpen(false);

    const [delOpen, setDelOpen] = useState(false);
    const handleDelOpen = () => setDelOpen(true);
    const handleDelClose = () => setDelOpen(false);

    const saveProfileInfo = () => {
        /* Save all the data into the database */
        alert("Your details have been saved!")
    }

    const changeTheThing = (inp, code) => {
        console.log("code " + code + ": " + inp);
        if (code == 0) {
            setUName(inp);
        }
        else if (code == 1) {
            setFName(inp);
        }
        else if (code == 2) {
            setLName(inp);
        }
        else if (code == 3) {
            setIsSlider(inp);
        }
        else if (code == 4) {
            setIsNotif(inp);
        }
        else if (code == 5) {
            setIsPub(inp);
        }
        else if (code == 6) {
            setNowAge(inp);
        }
        else if (code == 7) {
            setNowGen(inp);
        }
        else if (code == 8) {
            setNowBio(inp);
        }
        else {
            return;
        }
    }

    const returnTheThing = (code) => {
        if (code == 3) {
            if (isSlider == false) {
                return "Switch to Sliders";
            }
            else {
                return "Switch to Text";
            }
        }
        else if (code == 4) {
            if (isNotif == false) {
                return "Turn on";
            }
            else {
                return "Turn off";
            }
        }
        else if (code == 5) {
            if (isPub == false) {
                return "Switch to Public";
            }
            else {
                return "Switch to Private";
            }
        }
    }

    let DefBtnName = (m,n, mode) => {
        if (mode == false) {
            if (nowDaily[n] >= 0 && checkDaily[m][n] == true) {
                return "Set as Weekly Default";
            }
            else if (nowDaily[n] >= 0 && checkDaily[m][n] == false) {
                return "Set as Daily Default";
            }
            else if (nowDaily[n] < 0) {
                return "Set as Daily Default";
            }
        }
        else {
            if (nowDaily[n] >= 0 && checkDaily[m][n] == true && nowDaily[n+1] >= 0 && checkDaily[m][n+1] == true && nowDaily[n+2] >= 0 && checkDaily[m][n+2] == true) {
                return "Set as Weekly Default";
            }
            else if (nowDaily[n] >= 0 && checkDaily[m][n] == false && nowDaily[n+1] >= 0 && checkDaily[m][n+1] == false && nowDaily[n+2] >= 0 && checkDaily[m][n+2] == false) {
                return "Set as Daily Default";
            }
            else if (nowDaily[n] < 0 && nowDaily[n+1] < 0 && nowDaily[n+2] < 0) {
                return "Set as Daily Default";
            }
            else {
                return "Set as Daily Default";
            }
        }
        
    }

    let DefBtnClickHandler = (m,n,mode) => {
        let newDaily = [...nowDaily];
        let newCheckDaily = [...checkDaily];
        let myState = [...nowDefaults];
        
        if (newDaily[n] < 0) {
            //Here, if newDaily[n] is -1, then we set newDaily[n] to the current cell value AND set the newCheckDaily column to TRUE
            
            if (mode == true) {
                newDaily[n] = nowDefaults[m][n];
                for (let i = 0; i < 7; i++) {
                    newCheckDaily[i][n] = true;
                }

                newDaily[n+1] = nowDefaults[m][n+1];
                for (let i = 0; i < 7; i++) {
                    newCheckDaily[i][n+1] = true;
                }

                newDaily[n+2] = nowDefaults[m][n+2];
                for (let i = 0; i < 7; i++) {
                    newCheckDaily[i][n+2] = true;
                }
                
            }
            else {
                newDaily[n] = nowDefaults[m][n];
                for (let i = 0; i < 7; i++) {
                    newCheckDaily[i][n] = true;
                }
            }
        }
        else {
            //Here, there is already a value for newDaily[n].
            //IF the input is the same as newDaily[n], THEN newDaily[n] becomes -1 AND newCheckDaily column becomes FALSE except newCheckDaily[m][n]
            // The problem with ^^ is that IF the input is the same, then it has NOT been changed so it will NOT be in the defaultData array!! 
            // That's why I needed the boolean array to store if the input has been changed. 
            //IF the input is NOT the same as newDaily[n], THEN only newCheckDaily[m][n] becomes FALSE

            //Instead why don't I change newCheckDaily[m][n] to FALSE just WHEN the input changes ...
            // Hence if newCheckDaily[m][n] is TRUE when this method is called, then the input has to be the same!

            if (mode == true) {
                
                if (newCheckDaily[m][n] == true) {
                    myState[m][n] = newDaily[n];
                    newDaily[n] = -1;
                    
                    for (let i = 0; i < 7; i++) {
                        newCheckDaily[i][n] = false;
                    }
                }
                else {
                    newDaily[n] = nowDefaults[m][n];
                    for (let i = 0; i < 7; i++) {
                        newCheckDaily[i][n] = true;
                    }
                }

                if (newCheckDaily[m][n+1] == true) {
                    myState[m][n+1] = newDaily[n+1];
                    newDaily[n+1] = -1;
                    
                    for (let i = 0; i < 7; i++) {
                        newCheckDaily[i][n+1] = false;
                    }
                }
                else {
                    newDaily[n+1] = nowDefaults[m][n+1];
                    for (let i = 0; i < 7; i++) {
                        newCheckDaily[i][n+1] = true;
                    }
                }

                if (newCheckDaily[m][n+2] == true) {
                    myState[m][n+2] = newDaily[n+2];
                    newDaily[n+2] = -1;
                    
                    for (let i = 0; i < 7; i++) {
                        newCheckDaily[i][n+2] = false;
                    }
                }
                else {
                    newDaily[n+2] = nowDefaults[m][n+2];
                    for (let i = 0; i < 7; i++) {
                        newCheckDaily[i][n+2] = true;
                    }
                }

            }
            else {
                if (newCheckDaily[m][n] == true) {
                    myState[m][n] = newDaily[n];
                    newDaily[n] = -1;
                    
                    for (let i = 0; i < 7; i++) {
                        newCheckDaily[i][n] = false;
                    }
                }
                else {
                    newDaily[n] = nowDefaults[m][n];
                    for (let i = 0; i < 7; i++) {
                        newCheckDaily[i][n] = true;
                    }
                }
            }
        }
        setNowDaily(newDaily);
        setCheckDaily(newCheckDaily);
        setNowDefaults(myState);
    }

    let inpChangeHandler = (isSame, day, time, newInput) => {
        let myState = [...nowDefaults];
        let newCheckDaily = [...checkDaily];

        if (isNaN(newInput)) {
            newInput = -1;
        }


        if (isSame == true && (!isNaN(newInput) || newInput == -1) && newInput<10) {
            myState[day][time] = newInput/10;
            myState[day][time+1] = newInput/10;
            myState[day][time+2] = newInput/10;
          }
          else if ((!isNaN(newInput) || newInput == -1) && newInput<10) {
            myState[day][time] = newInput/10;
            newCheckDaily[day][time] = false;
          }

          setNowDefaults(myState);
          setCheckDaily(newCheckDaily);


    }


    let returnValue = (p,q) => {

       if (nowDaily[q] < 0 || checkDaily[p][q] == false) {
            if (nowDefaults[p][q] < 0) {
                return "-";
            }
            else {
                return 10*nowDefaults[p][q];
            }
       }
       else  {
        return 10*nowDaily[q];
       }
    }

      const retTime = (ind) => {
        if (ind < 12) {
            return ind + "AM";
        }
        else if (ind == 12) {
            return ind + "PM"
        }
        else if (ind > 12 && ind < 24) {
            return (ind-12) + "PM";
        }
        
        else if (ind == 24) {
            return (ind - 12) + "AM";
        }
        else {
            return (ind - 24) + "AM";
        }
        
      }

    const cellStateHandler = (p,q) => {
        let newCellStates = [...nowStates];
        newCellStates[p][q] = !newCellStates[p][q];
        setNowStates(newCellStates);
    }

    const SaveDefaultData = () => {
        let tempData = [...nowToSave];

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                if (nowDaily[j] >= 0 && checkDaily[i][j] == true) {
                    tempData[i][j] = nowDaily[j];
                }
                else {
                    tempData[i][j] = nowDefaults[i][j];
                }
            }
        }

        setSave(tempData);
        alert("Your data has been saved!");

    }

    const retCell = (p,q) => {
        let temp1 = returnValue(p,3*q);
        let temp2 = returnValue(p,1+3*q);
        let temp3 = returnValue(p,2+3*q);
        

        if (nowStates[p][q] == true) {
            if (temp1 != temp2 || temp1 != temp3) {
                temp1="-";
            }
            return (

                <div id="cMode1">
                    <br></br>
                    <br></br>
                    <div id="cModeSect">
                        <input id="Inp1" type="text" value={temp1} onChange={(e) => {inpChangeHandler(true, p, 3*q, e.target.value)}}></input>
                    
                        <button class="btn btn-primary" id="entryOptions2" onClick={() => {DefBtnClickHandler(p, 3*q, true)}}>
                            {DefBtnName(p,3*q, true)}
                        </button>
                    </div>
                    
                </div>
            );
        }
        else {

            return (
                <div id="cMode2">
                    <div id="cModeSect">
                        <input id="Inp2" type="text" value={temp1} onChange={(e) => {inpChangeHandler(false, p, 3*q, e.target.value)}}></input>
                        <button class="btn btn-success" id="entryOptions2" onClick={() => {DefBtnClickHandler(p, 3*q, false)}}>
                            {DefBtnName(p,3*q, false)}
                        </button>
                    </div>
                    <div id="cModeSect">
                        <input id="Inp2" type="text" value={temp2} onChange={(e) => {inpChangeHandler(false, p, 1+3*q, e.target.value)}}></input>
                        <button class="btn btn-success" id="entryOptions2" onClick={() => {DefBtnClickHandler(p, 1+3*q, false)}}>
                            {DefBtnName(p,1+3*q, false)}
                        </button>
                    </div>
                    <div id="cModeSect">
                        <input id="Inp2" type="text" value={temp3} onChange={(e) => {inpChangeHandler(false, p, 2+3*q, e.target.value)}}></input>
                        <button class="btn btn-success" id="entryOptions2" onClick={() => {DefBtnClickHandler(p, 2+3*q, false)}}>
                            {DefBtnName(p,2+3*q, false)}
                        </button>
                    </div>
                </div>
            );
        }
    }

    const retHead = (p,q) => {
        if (nowStates[p][q] == true) {
            return "Split";
        }
        else {
            return "Merge";
        }
    }

    const retHeadColor = (p,q) => {
        if (nowStates[p][q] == true) {
            return "btn btn-primary";
        }
        else {
            return "btn btn-success";
        }
    }


    const defaultTable = (m) => {
        
        return nowDefaults[m].map(
            (defData, index) => {
                if (index % 3 != 0) {
                    return;
                }
                else {
                    return (
                        <React.Fragment>
                            <tr>
                                <th scope="row">{retTime(index+8)}-{retTime(index+9)}</th>
                                <td rowspan="4" id="eachTableCell">
                                    {retCell(m,index/3)}
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">{retTime(index+9)}-{retTime(index+10)}</th>
                            </tr>
            
                            <tr>
                                <th scope="row">{retTime(index+10)}-{retTime(index+11)}</th>
                            </tr>
            
                            <tr>
                                <th scope="row">
                                    <button class={retHeadColor(m, index/3)} id="tableBtn" onClick={() => {cellStateHandler(m, index/3)}}>{retHead(m,index/3)}</button>
                                    <br></br>
                                </th>
                            </tr>
                        </React.Fragment>
                    );
                }
                
            }
        );
        
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

                <div id="stuffWithSearch">
                    <SearchFriends></SearchFriends>
                </div>

                <br></br>
                <br></br>

                <div>
                    <div class="card" id="defaultDataCard">
                        <div class="card-header" style={{textAlign: "center", borderBottom: "3px solid white"}}>
                            <h5>Edit Default Data</h5>
                            
                            {retDate(Today, tabIndex)}
                            
                        </div>
                        
                        <div class="card-body" id="defaultDataCardBody">
                            <br></br>
                            <h6>
                                Enter a number from 0 to 10 indicating how busy you are in each time range!
                            </h6>
                            <p>
                                When entered for a certain day of the week, default data will automatically be stored for that day every week.
                                <br></br>
                                The "Set as Daily Default" button takes the value in the cell and sets that value for the same time range each day.
                                <br></br>
                                For more directions, visit the Add Data page!
                            </p>
                            <br></br>
                            <div id="defaultTableContainer">
                                <table class="table table-dark table-bordered" id="defaultDataTable" style={{textAlign: "center", border:"2px solid white"}}>
                                    <thead>
                                        {
                                        <tr>
                                            <th scope="col" id="tabHeader">
                                                <p>Time Range</p>
                                            </th>
                                            <th scope="col">
                                                <p>Enter Data</p>
                                            </th>
                                        </tr>
                                        }
                                    </thead>
                                    <tbody>
                                        {defaultTable(tabIndex)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card-footer" style={{textAlign: "center", borderTop:"5px solid white"}}>
                            <Button id="leftArrow"  onClick={leftClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-caret-left" viewBox="0 0 16 16">
                                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                                </svg>
                            </Button>
                            <Button id="rightArrow" onClick={rightClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-caret-right" viewBox="0 0 16 16">
                                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                </svg>
                            </Button>
                            <br></br>
                            <br></br>
                            <button class="btn btn-secondary" onClick={() => {SaveDefaultData()}} style={{border: "1px solid black", marginBottom: "10px", marginRight: "20px"}}>
                                Save Data!
                            </button>
                            <button class="btn btn-primary btn-sm" style={{border: "1px solid black", marginBottom: "10px"}}>
                                <Link
                                    style={{textDecoration: "none", color: "white"}}
                                    to={"/addData"}
                                    state={{username: "", password: ""}}
                                >
                                    <Typography>
                                    Add when you're free
                                    </Typography> 
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>

                <br></br>
            </div>
        </Container>
        <Footer type="2"></Footer>
    </div>
  )
}

export default EditDetails