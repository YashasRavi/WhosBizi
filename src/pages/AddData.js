import React from 'react'
import { Container } from '@mui/material'
import { useState, useEffect } from 'react';
import {Slider} from '@mui/material'
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./AddDataStyle.css";

const AddData = () =>  {

  let toSaveTemp = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  ];

  let dummyData = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  ];

  let dummyDefaults = [
    [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  ];

  let origCells = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
  ];

  let origSwitches = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
  ]
  
    const [tableState, setTableState] = useState(dummyData);
    
    for (let d = 0; d < 7; d++) {
      for (let i = 0; i < 8; i++) {
  
        if (tableState[d][i*3] == tableState[d][1+i*3] && tableState[d][i*3] == tableState[d][2+i*3]) {
          origCells[d][i] = true;
        }
        else {
          origCells[d][i] = false;
        }
  
      }
    }

    useEffect(() => {
      document.querySelector(".tableContainer").scrollIntoView();
    }, [])
    

    const [cellStates, setCellStates] = useState(origCells);

    const [switchStates, setSwitchStates] = useState(origSwitches);

    const [defaultState, setDefaultState] = useState(dummyDefaults);

    const [toSave, setToSave] = useState(toSaveTemp);

    const [maxValue, setMaxValue] = useState(10);
    const [tempMaxValue, setTempMaxValue] = useState(10);

   let k = [10, 8, 7]; 
   const [test, setTest] = useState(k);    

  let printTest = (n) => {
    if (n == true) {
      return <p>true</p>
    }
    else {
      return <p>false</p>
    }
  }


    let returnValue = (inp, defInp) => {
      
      
      if (inp < 0) {
        if (defInp < 0) {
          return "-"; 
        }
        else {
          return Math.floor(10*defInp)/10;
        }
      }
      else if (maxValue != 0) {
        return Math.floor(10*inp)/10;
      }     
      
    }

    let changeMaxValue = () => {
      
      if(!isNaN(tempMaxValue) && tempMaxValue > 0) {
        setMaxValue(tempMaxValue); 
      }
      else {
        alert("Please enter a valid number that is higher than 0 for the maximum!");
      }
    }

    const displaySliderValue = (inp) => {
      if (inp == 0.1) {
        return 0;
      }
      else if (isNaN(inp)) {
        return "-";
      }
      else {
        return inp;
      }
    }
    
    //console.log(cellStates);

    let changeSwitchStates = (m) => {
      console.log(m);
      
      let newSwitches = [...switchStates];
      for (let i = 0; i < 7; i++) {
        newSwitches[i][m] = !newSwitches[i][m];
      }
      
      setSwitchStates(newSwitches);
    }

    let changeCellStates = (m,n) => {

      let newCells = [...cellStates];
      newCells[m][n] = !newCells[m][n];
      setCellStates(newCells);

    }

    let dataChangeHandler = (isSame, day, time, newInput) => {
      let tempState = [...tableState];
      
      if (isNaN(newInput)) {
        newInput = -1;
      }

      if (newInput > maxValue) {
        console.log("REACHED");
        return;
      }

      if (newInput == 0.1) {
        newInput = 0;
      }
      

      if (isSame == true && (!isNaN(newInput) || newInput == -1)) {
        tempState[day][time] = newInput/maxValue;
        tempState[day][time+1] = newInput/maxValue;
        tempState[day][time+2] = newInput/maxValue;
      }
      else if (!isNaN(newInput) || newInput == -1) {
        tempState[day][time] = newInput/maxValue;
      }
      
      setTableState(tempState);
      
    }

    let returnCell = (day, range, inpBool, max) => {
        let temp1 = returnValue(max*tableState[day][3*range], max*defaultState[day][3*range]);
        let temp2 = returnValue(max*tableState[day][1+3*range], max*defaultState[day][1+3*range]);
        let temp3 = returnValue(max*tableState[day][2+3*range], max*defaultState[day][2+3*range]);

        let def1 = "white";
        let sl1 = "red";
        let def2 = "white";
        let sl2  = "red";
        let def3 = "white";
        let sl3 = "red";

        if (defaultState[day][3*range] >= 0 && tableState[day][3*range] < 0 && maxValue != 0) {
          def1 = "#FFEBCD";
          sl1 = "orange";
        }

        if (defaultState[day][1+3*range] >= 0 && tableState[day][1+3*range] < 0 && maxValue != 0) {
          def2 = "#FFEBCD";
          sl2 = "orange";
        }

        if (defaultState[day][2+3*range] >= 0 && tableState[day][2+3*range] < 0 && maxValue != 0) {
          def3 = "#FFEBCD";
          sl3 = "orange";
        }

        let eqDefaults = (defaultState[day][3*range] == defaultState[day][1+3*range] && defaultState[day][3*range] == defaultState[day][2+3*range]);

        if (switchStates[day][range] == false) {
          if (inpBool == true) {
            
            if (temp1 != temp2 || temp1 != temp3) {
              temp1 = "-";
            }

            if (def1 == "#FFEBCD" && def1 == def2 && def1 == def3 && eqDefaults) {
              def1 = "#FFEBCD"
            }
            else {
              def1 = "white";
            }

            return (
              <div id="cellMode1">
                <input id="inp1" type="text" style={{backgroundColor: def1}} value={temp1} onChange={(e) => {dataChangeHandler(true, day, 3*range, e.target.value); }}></input>
                <button class="btn btn-primary" id="btn1" onClick={() => {changeCellStates(day, range)}}>Split</button>
              </div>
            );
          }
          else  {
              return (
                <div id="cellMode2">
                  <input id="inp2" type="text" style={{backgroundColor: def1}} value={temp1} onChange={(e) => dataChangeHandler(false, day, 3*range, e.target.value)}></input>
                  <input id="inp2" type="text" style={{backgroundColor: def2}} value={temp2} onChange={(e) => dataChangeHandler(false, day, 1+3*range, e.target.value)}></input>
                  <input id="inp2" type="text" style={{backgroundColor: def3}} value={temp3} onChange={(e) => dataChangeHandler(false, day, 2+3*range, e.target.value)}></input>
                  <button class="btn btn-success" id="btn2" onClick={() => {changeCellStates(day, range)}}>Merge</button>
                </div>
              );
          }
        }
        else {
          if (inpBool == true) {
            if (temp1 != temp2 || temp1 != temp3) {
              temp1 = "-";
            }
            
            if (sl1 == "#FFEBCD" && sl1 == sl2 && sl1 == sl3 && eqDefaults) {
              sl1 = "orange"
            }
            else {
              sl1 = "red";
            }

            return (
              <div id="cellMode1">
                <Slider
                  id="Slider1"
                  onChange={(e) => {dataChangeHandler(true, day, 3*range, e.target.value); }}
                  defaultValue={0}
                  value={temp1}
                  min={0.1} 
                  max={maxValue}
                  marks
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  valueLabelFormat = {displaySliderValue}
                  sx={{
                    width: 80,
                    color: sl1,
                  }}
                />
                <button class="btn btn-primary" id="btn1" onClick={() => {changeCellStates(day, range)}}>Split</button>
              </div>
            );
          }
          else  {
              return (
                <div id="cellMode2">
                  <Slider
                    id="Slider2"
                    onChange={(e) => {dataChangeHandler(false, day, 3*range, e.target.value); }}
                    defaultValue={0}
                    value={temp1}
                    min={0.1} 
                    max={maxValue}
                    marks
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    valueLabelFormat = {displaySliderValue}
                    sx={{
                      width: 80,
                      color: sl1,
                    }}
                  />
                 
                  <Slider
                    id="Slider2"
                    onChange={(e) => {dataChangeHandler(false, day, 1+3*range, e.target.value); }}
                    defaultValue={0}
                    value={temp2}
                    min={0.1} 
                    max={maxValue}
                    marks
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    valueLabelFormat = {displaySliderValue}
                    sx={{
                      width: 80,
                      color: sl2,
                    }}
                  />
                  
                  <Slider
                    id="Slider2"
                    onChange={(e) => {dataChangeHandler(false, day, 2+3*range, e.target.value); }}
                    defaultValue={0}
                    value={temp3}
                    min={0.1} 
                    max={maxValue}
                    marks
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    valueLabelFormat = {displaySliderValue}
                    sx={{
                      width: 80,
                      color: sl3,
                    }}
                  />
                  <br></br>
                  <button class="btn btn-success" id="btn2" onClick={() => {changeCellStates(day, range)}}>Merge</button>
                </div>
              );
          }
        }
    }

    let saveAllChanges = () => {
      let tempSave = [...tableState];
      setToSave(tempSave);

    }

    let today = new Date();
    let Now = today;


    function retDate (date, offset) {
        const tod = date;
        const next = new Date(tod);
        next.setDate(tod.getDate()+offset);
        let current = next.getDay();
        if (current == 0) {
          return <p>Sun, {next.getMonth()+1}/{next.getDate()}</p>;
        }
        if (current == 1) {
          return <p>Mon, {next.getMonth()+1}/{next.getDate()}</p>;
        }
        if (current == 2) {
          return <p>Tue, {next.getMonth()+1}/{next.getDate()}</p>;
        }
        if (current == 3) {
          return <p>Wed, {next.getMonth()+1}/{next.getDate()}</p>;
        }
        if (current == 4) {
          return <p>Thu, {next.getMonth()+1}/{next.getDate()}</p>;
        }
        if (current == 5) {
          return <p>Fri, {next.getMonth()+1}/{next.getDate()}</p>;
        }
        if (current == 6) {
          return <p>Sat, {next.getMonth()+1}/{next.getDate()}</p>;
        }
    }


  return (
    <div style={{backgroundImage: "linear-gradient(45deg, #708090, #2F4F4F)"}}>
        <div style={{position: "fixed", width: "100%", zIndex: "10", boxShadow: "2px 2px 3px 4px"}}>
          <Header type="1"></Header>
        </div>
        <Container id="wholeContainer">
            <h2 className="chatTitle">
                Record when you're free!
            </h2>
            <br></br>
            <div id = "dataBtns">
              <div class="card" id = "maxDataCard">
                <div class="card-body card-primary" id = "maxDataBody">
                  <h5 class="card-title" style={{color: "#FFD700"}}>
                    Set the maximum value:
                  </h5>
                  <p style={{color: "yellow", textAlign: "center", marginTop: "10px"}}>
                    This value represents how free you can possibly get!
                  </p>
                  <br></br>
                  <input type="text" id="maxEntryForm" defaultValue={maxValue} onChange={(e) => setTempMaxValue(e.target.value)}></input>
                  <br></br>
                  <br></br>
                  <button class="btn btn-warning" onClick={changeMaxValue}>Submit</button>
                  <br></br>
                  <h5 style={{color: "#FFD700"}}>
                    The current maximum is {maxValue}.
                  </h5>
                </div>
              </div>
              <br></br>
              <br></br>
              <button id="aDataBtn" class="btn btn-warning btn-lg" onClick={saveAllChanges}>Save All Data</button>
              <br></br>
              <Link
                style={{textDecoration: "none", color: "white"}}
                to={"/editDetails"}
                state={{username: "", password: "", scr: 3}}
              >
                  <button id="aDataBtn" class="btn btn-dark">Edit Defaults</button>
              </Link>
              <br></br>
              <br></br>
              <div class="card bg-warning" id="theDirections">
                <div class="card-header">
                  <h5>
                    Directions:
                  </h5>
                </div>
                <div class="card-body">
                  <p>
                    - Each cell represents a time range for a specific day. 
                    <br></br>
                    - In each cell, enter a number less than the maximum value. This value represents how free you are in that time range.
                    <br></br>
                    - If you want to clear the cell, enter any NON-NUMERIC key. Any letter or symbol would suffice.
                    <br></br>
                    - Click the "Split" button to enter a specific value for each hour. If you want to revert back, click the "Merge" button.
                    <br></br>
                    - A hiphen ("-") means there is no data entered in the cell yet. It could also mean that you entered different data for each hour in a time range and then clicked "Merge".
                    <br></br>
                    - Click the "Switch Input" button to toggle between text and slider input options.
                    <br></br>
                    - A yellow background in the text field or a yellow slider means that there is no data entered, but you have already selected default data for the time range.
                  </p>
                </div>
                <div class="card-footer">
                  <button id="aDataBtn" class="btn btn-dark btn-large">
                    Click for More Help!
                  </button>
                </div>
              </div>
              <br></br>
            </div>
            <br></br>
            <br></br>
            <div class="card" className="tableContainer">
                <table class="table table-dark table-bordered" id = "dataTable">
                    <thead>
                        <tr>
                            <th scope="col"><p>Time Range</p></th>
                            <th scope="col">{retDate(Now, 0)}</th>
                            <th scope="col">{retDate(Now, 1)}</th>
                            <th scope="col">{retDate(Now, 2)}</th>
                            <th scope="col">{retDate(Now, 3)}</th>
                            <th scope="col">{retDate(Now, 4)}</th>
                            <th scope="col">{retDate(Now, 5)}</th>
                            <th scope="col">{retDate(Now, 6)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">8AM-9AM</th>
                            <td rowspan="4">{returnCell(0,0, cellStates[0][0], maxValue)}</td>
                            <td rowspan="4">{returnCell(1,0, cellStates[1][0], maxValue)}</td>
                            <td rowspan="4">{returnCell(2,0, cellStates[2][0], maxValue)}</td>
                            <td rowspan="4">{returnCell(3,0, cellStates[3][0], maxValue)}</td>
                            <td rowspan="4">{returnCell(4,0, cellStates[4][0], maxValue)}</td>
                            <td rowspan="4">{returnCell(5,0, cellStates[5][0], maxValue)}</td>
                            <td rowspan="4">{returnCell(6,0, cellStates[6][0], maxValue)}</td>
                        </tr>
                        <tr>
                            <th scope="row">9AM-10AM</th>
                        </tr>
                        <tr>
                            <th scope="row">10AM-11AM</th>
                        </tr>
                        <tr>
                            <th scope="row" id="switchPlace">
                              <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(0)}>Switch Input</button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">11AM-12PM</th>
                            <td rowspan="4">{returnCell(0,1, cellStates[0][1], maxValue)}</td>
                            <td rowspan="4">{returnCell(1,1, cellStates[1][1], maxValue)}</td>
                            <td rowspan="4">{returnCell(2,1, cellStates[2][1], maxValue)}</td>
                            <td rowspan="4">{returnCell(3,1, cellStates[3][1], maxValue)}</td>
                            <td rowspan="4">{returnCell(4,1, cellStates[4][1], maxValue)}</td>
                            <td rowspan="4">{returnCell(5,1, cellStates[5][1], maxValue)}</td>
                            <td rowspan="4">{returnCell(6,1, cellStates[6][1], maxValue)}</td>
                        </tr>
                        <tr>
                            <th scope="row">12PM-1PM</th>
                        </tr>
                        <tr>
                            <th scope="row">1PM-2PM</th>
                        </tr>
                        <tr>
                            <th scope="row" id="switchPlace">
                              <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(1)}>Switch Input</button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">2PM-3PM</th>
                            <td rowspan="4">{returnCell(0,2, cellStates[0][2], maxValue)}</td>
                            <td rowspan="4">{returnCell(1,2, cellStates[1][2], maxValue)}</td>
                            <td rowspan="4">{returnCell(2,2, cellStates[2][2], maxValue)}</td>
                            <td rowspan="4">{returnCell(3,2, cellStates[3][2], maxValue)}</td>
                            <td rowspan="4">{returnCell(4,2, cellStates[4][2], maxValue)}</td>
                            <td rowspan="4">{returnCell(5,2, cellStates[5][2], maxValue)}</td>
                            <td rowspan="4">{returnCell(6,2, cellStates[6][2], maxValue)}</td>
                        </tr>
                        <tr>
                            <th scope="row">3PM-4PM</th>
                        </tr>
                        <tr>
                            <th scope="row">4PM-5PM</th>
                        </tr>
                        <tr>
                            <th scope="row" id="switchPlace">
                              <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(2)}>Switch Input</button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">5PM-6PM</th>
                            <td rowspan="4">{returnCell(0,3, cellStates[0][3], maxValue)}</td>
                            <td rowspan="4">{returnCell(1,3, cellStates[1][3], maxValue)}</td>
                            <td rowspan="4">{returnCell(2,3, cellStates[2][3], maxValue)}</td>
                            <td rowspan="4">{returnCell(3,3, cellStates[3][3], maxValue)}</td>
                            <td rowspan="4">{returnCell(4,3, cellStates[4][3], maxValue)}</td>
                            <td rowspan="4">{returnCell(5,3, cellStates[5][3], maxValue)}</td>
                            <td rowspan="4">{returnCell(6,3, cellStates[6][3], maxValue)}</td>
                        </tr>
                        <tr>
                            <th scope="row">6PM-7PM</th>
                        </tr>
                        <tr>
                            <th scope="row">7PM-8PM</th>
                        </tr>
                        <tr>
                            <th scope="row" id="switchPlace">
                              <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(3)}>Switch Input</button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">8PM-9PM</th>
                            <td rowspan="4">{returnCell(0,4, cellStates[0][4], maxValue)}</td>
                            <td rowspan="4">{returnCell(1,4, cellStates[1][4], maxValue)}</td>
                            <td rowspan="4">{returnCell(2,4, cellStates[2][4], maxValue)}</td>
                            <td rowspan="4">{returnCell(3,4, cellStates[3][4], maxValue)}</td>
                            <td rowspan="4">{returnCell(4,4, cellStates[4][4], maxValue)}</td>
                            <td rowspan="4">{returnCell(5,4, cellStates[5][4], maxValue)}</td>
                            <td rowspan="4">{returnCell(6,4, cellStates[6][4], maxValue)}</td>
                        </tr>
                        <tr>
                            <th scope="row">9PM-10PM</th>
                        </tr>
                        <tr>
                            <th scope="row">10PM-11PM</th>
                        </tr>
                        <tr>
                            <th scope="row" id="switchPlace">
                              <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(4)}>Switch Input</button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">11PM-12AM</th>
                            <td rowspan="4">{returnCell(0,5, cellStates[0][5], maxValue)}</td>
                            <td rowspan="4">{returnCell(1,5, cellStates[1][5], maxValue)}</td>
                            <td rowspan="4">{returnCell(2,5, cellStates[2][5], maxValue)}</td>
                            <td rowspan="4">{returnCell(3,5, cellStates[3][5], maxValue)}</td>
                            <td rowspan="4">{returnCell(4,5, cellStates[4][5], maxValue)}</td>
                            <td rowspan="4">{returnCell(5,5, cellStates[5][5], maxValue)}</td>
                            <td rowspan="4">{returnCell(6,5, cellStates[6][5], maxValue)}</td>
                        </tr>
                        <tr>
                            <th scope="row">12AM-1AM</th>
                        </tr>
                        <tr>
                            <th scope="row">1AM-2AM</th>
                        </tr>
                        <tr>
                            <th scope="row" id="switchPlace">
                              <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(5)}>Switch Input</button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">2AM-3AM</th>
                            <td rowspan="4">{returnCell(0,6, cellStates[0][6], maxValue)}</td>
                            <td rowspan="4">{returnCell(1,6, cellStates[1][6], maxValue)}</td>
                            <td rowspan="4">{returnCell(2,6, cellStates[2][6], maxValue)}</td>
                            <td rowspan="4">{returnCell(3,6, cellStates[3][6], maxValue)}</td>
                            <td rowspan="4">{returnCell(4,6, cellStates[4][6], maxValue)}</td>
                            <td rowspan="4">{returnCell(5,6, cellStates[5][6], maxValue)}</td>
                            <td rowspan="4">{returnCell(6,6, cellStates[6][6], maxValue)}</td>
                        </tr>
                        <tr>
                            <th scope="row">3AM-4AM</th>
                        </tr>
                        <tr>
                            <th scope="row">4AM-5AM</th>
                        </tr>
                        <tr>
                            <th scope="row" id="switchPlace">
                              <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(6)}>Switch Input</button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">5AM-6AM</th>
                            <td rowspan="4">{returnCell(0,7, cellStates[0][7], maxValue)}</td>
                            <td rowspan="4">{returnCell(1,7, cellStates[1][7], maxValue)}</td>
                            <td rowspan="4">{returnCell(2,7, cellStates[2][7], maxValue)}</td>
                            <td rowspan="4">{returnCell(3,7, cellStates[3][7], maxValue)}</td>
                            <td rowspan="4">{returnCell(4,7, cellStates[4][7], maxValue)}</td>
                            <td rowspan="4">{returnCell(5,7, cellStates[5][7], maxValue)}</td>
                            <td rowspan="4">{returnCell(6,7, cellStates[6][7], maxValue)}</td>
                        </tr>
                        <tr>
                            <th scope="row">6AM-7AM</th>
                        </tr>
                        <tr>
                            <th scope="row">7AM-8AM</th>
                        </tr>
                        <tr>
                            <th scope="row" id="switchPlace">
                              <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(7)}>Switch Input</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
               
            </div>

            <br></br>
            <br></br>
        </Container>
        <Footer type="1"></Footer>
    </div>
  )
}

export default AddData