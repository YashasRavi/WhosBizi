import React from 'react'
import { Container } from '@mui/material'
import { useState, useEffect } from 'react';
import {Slider} from '@mui/material'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./AddDataStyle.css";

const AddData = () =>  {

  // defValueFromServer represents the daily default data value that the user entered when previously modifying the default data.
  let defValueFromServer = 0;

  /*
    toSaveTemp represents the data that is supposed to be saved to the backend. 
    Used as an inital value for toSave.
  */
  let toSaveTemp = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  ];

  /* 
    dummyData is the initial data present when the webpage opens, which will be changed when the user enters 
    their input data into the text fields. Once the backend is formed, the data from the backend will be used.
  */
  let dummyData = [
    [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  ];

  /*
    origCells represents whether the data in every 3 cells is merged. If so, origCells[x][y] is false.
    Intially, all values are set to false, meaning that the data is split for every 3 hour interval.
    The for loop later used will set every index to its correct value based on the data in tableState[].
  */
  let origCells = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
  ];

  /*
    origSwitches represents whether the data in every 3 cells is a text field or slider. 
    Intially, all values are set to false, meaning that is every input field is a text field 
    (and NOT a slider).
  */
  let origSwitches = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
  ]
  
  // tableState represents the data present in every cell of the table, which is initially equal to dummyData.
  const [tableState, setTableState] = useState(dummyData);
  
  // cellStates represents if every 3 hours of each day are merged into 1 cell or seperated to individual cells.
  const [cellStates, setCellStates] = useState(origCells);

  // switchStates represents if every 3 hours of each day is represented as a text field or a slider.
  const [switchStates, setSwitchStates] = useState(origSwitches);

  // toSave represents the data that is supposed to be saved to the backend. Initially set to toSaveTemp.
  const [toSave, setToSave] = useState(toSaveTemp);

  // currentDefault represents the value the user wants to enter for daily defaults. This value has to be sent from the server and is editable in the page.
  const [currentDefault, setCurrentDefault] = useState(defValueFromServer);

  // selectedDefaultDays represents a list of the day checkboxes that are selected for the daily defaults.
  const [selectedDefaultDays, setSelectedDefaultDays] = useState([]);

  // selectedDefaultTimes represents a list of the time checkboxes that are selected for the daily defaults.
  const [selectedDefaultTimes, setSelectedDefaultTimes] = useState([]);

  // maxValue represents the maximum possible number to represent how free the user is.
  const [maxValue, setMaxValue] = useState(10);

  // tempMaxValue represents the value entered in the text area to set the max value.
  const [tempMaxValue, setTempMaxValue] = useState(10);

  /*
    updateCellStates() sets the value of cellStates to true if the values in every hour of a 3 hour interval are the same.
    
    In other words, if hour 3*n, 3*n+1, and 3*n+2 are the same. This is done by checking if the values in 
    tableState[x][3*y], tableState[x][3*y+1], and tableState[x][3*y+2] are all equal.
    This means that tableState[x][3*y] is mergable.
  */
  const updateCellStates = () => {

    let tempCellStates = [...cellStates];    
    
    // Traverse every day represented by tableState.
    for (let d = 0; d < 7; d++) {
      // Traverse every hour in the day represented by tableState[d].
      for (let i = 0; i < 8; i++) {

        // Check if every 3 hour interval has the same value.
        if (tableState[d][i*3] == tableState[d][1+i*3] && tableState[d][i*3] == tableState[d][2+i*3]) {
          // If so, set cellStates[][] for that interval to true (merging).
          tempCellStates[d][i] = true;
        }

        // Check if every 3 hour interval have differing values.
        else {
          // If so, set cellStates[][] for that interval to false (splitting).
          tempCellStates[d][i] = false;
        }

      }
    }

    setCellStates(tempCellStates);
  }

  // Scrolls the user to the data table so that the instructions do not come into view when the webpage is loaded.
  useEffect(() => {
    updateCellStates();
  }, [])

  /*
    returnValue() takes in inp (a value in tableState) and rounds it to the nearest tenth 
    to display it.
  */
  let returnValue = (inp) => {
    // Check if inp (the value in tableState) is not yet set (meaning inp is -1).
    if (inp < 0) {
      return "-";
    }

    // If inp has already been set, check if the maximum value is not 0.
    else if (maxValue != 0) {
      // If so, return the inp value rounded to the nearest tenth.
      return Math.floor(10*inp)/10;
    }     
    
  }

  /*
    changeMaxValue() sets maxValue to the value in the input field to set the max value,
    which is currently tempMaxValue. Note that tempMaxValue changes whenever the user
    enters a new number into the input field, and this number is stored to maxValue
    when the user clicks the submit button.
  */
  let changeMaxValue = () => {
    
    // Checks if the value in the input field (tempMaxValue) is valid and positive.
    if(!isNaN(tempMaxValue) && tempMaxValue > 0) {
      // Changes the value of maxValue to tempMaxValue.
      if (currentDefault > maxValue) {
        alert("Change your input in the daily defaults input field, since it is higher than the maximum value.");
      }
      else {
        setMaxValue(tempMaxValue); 
      }
    }

    // If the value in tempMaxValue is invalid, display an alert message.
    else {
      // Alert the user if tempMaxValue is invalid.
      alert("Please enter a valid number that is higher than 0 for the maximum!");
    }

  }

  /*
    handleCheckboxChange() updates the daily defaults checkbox state DEPENDING on the 
    checkboxes that the user selects.
  */
  const handleCheckboxChange = (event, isTime) => {
    const target = event.target;
    const value = target.value;
    const isChecked = target.checked;

    // Update state based on whether the checkbox was checked or unchecked
    if (isTime == true) {
      setSelectedDefaultTimes(prev => {
        if (isChecked) {
          // Add the value to the array of selected checkboxes
          return [...prev, value];
        } else {
          // Remove the value from the array of selected checkboxes
          return prev.filter(checkboxValue => checkboxValue !== value);
        }
      });
    }
    else {
      setSelectedDefaultDays(prev => {
        if (isChecked) {
          // Add the value to the array of selected checkboxes
          return [...prev, value];
        } else {
          // Remove the value from the array of selected checkboxes
          return prev.filter(checkboxValue => checkboxValue !== value);
        }
      });
    }
  };


  /*

    populateDailyDefaults() uses the currently selected checkboxes to populate the 
    daily defaults into the default data table. 
  */
  const populateDailyDefaults = () => {
    
    let tempState = [...tableState];
    const possibleDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayList = retDayList();
    let timeSlots = retTimeSlots();

    // Iterate through every day in the week starting from today.
    for (let d = 0; d < dayList.length; d++) {
      let currDay = possibleDays[dayList[d]];
      // Check if the array of selected days from the checkbox is empty.
      if (selectedDefaultDays.length == 0) {
        // This means the user has not selected any days, so inform them and abort.
        alert("Please select the days that you want to enter a value for.");
        return;
      }
      // Check if the current day being processed in the loop is selected in the checkbox.
      if (selectedDefaultDays.includes(currDay)) {
        if (selectedDefaultTimes.length == 0) {
          // This means the user has not selected any hours, so inform them and abort.
          alert("Please select the hours that you want to enter a value for.");
          return;
        }
        // Iterate through every hour.
        for (let r = 0; r < timeSlots.length; r++) {
            // Form the hour range string using timeSlots.
            let hourRangeString = timeSlots[r] + "-" + timeSlots[r+1];
            // Check if this hour range is selected in the checkbox.
            if (selectedDefaultTimes.includes(hourRangeString)) {
              // If so, for the hour range in EACH selected day, change the cell value to the value entered by the user.
              tempState[d][r] = currentDefault/maxValue;
            }
        }
      }
    }

    // Update the state accordingly.
    setTableState(tempState);
    // Update to merge or split the cells, since their values have changed.
    updateCellStates();
    // Scroll the user to the data table.
    document.querySelector(".tableContainer").scrollIntoView();

  }

  /*
    displaySliderValue() returns the value that is displayed in the slider label. 
    The function uses an input value "inp" which is based on the current value in the cell
    that the function is being used for.
  */
  const displaySliderValue = (inp) => {

    // Check if the value in the slider is 0.1.
    if (inp == 0.1) {
      // Because the minimum value in the slider is 0.1, set the label to 0 if the value is 0.1.
      return 0;
    }

    // Check if the value is not a valid number.
    else if (isNaN(inp)) {
      // If so, return "-" in the label.
      return "-";
    }

    // Check if inp does NOT satisfy any of the above conditions.
    else {
      // If so, inp is valid and not 0.1, so return inp.
      return inp;
    }

  }

  /*
    changeSwitchStates() takes input m (representing the 3-hour interval) and switches the
    input type at that interval for EVERY day of the week from text field to slider OR 
    slider to text field.
  */
  let changeSwitchStates = (m) => {
    // Make a copy of switchStates and store it in newSwitches (which will be modified). 
    let newSwitches = [...switchStates];
    
    /*
      Here, m represents a 3-hour interval (ex: 8AM-11AM). Traverse every day of the week 
      and switch the input type at that interval (ex: 8AM-11AM on Monday to Friday).
    */
    for (let i = 0; i < 7; i++) {
      // Switch the input type at day i and interval m.
      newSwitches[i][m] = !newSwitches[i][m];
    }
    
    // Save the changes to switchStates c
    setSwitchStates(newSwitches);
  }

  /*
    changeCellStates() takes a day m and 3-hour interval n and merges the cells at hours
    3n, 3n+1, and 3n+2 OR splits the cell at hour 3n into 3n, 3n+1, and 3n+2.
  */
  let changeCellStates = (m,n) => {
    // Make a copy of cellStates and store it in newCells (which will be modified).
    let newCells = [...cellStates];

    // Check if the cell is currently in a split state.
    if (cellStates[m][n] == false) {
      // If so, check if all 3 hours in the 3-hour interval are equal.
      if (tableState[m][3*n] == tableState[m][1+3*n] && tableState[m][3*n] == tableState[m][2+3*n]) {
        // If so, allow merging to occur.
        newCells[m][n] = !newCells[m][n];
      }
      // Check if the 3 hours in the 3-hour interval are NOT equal.
      else {
        // If so, disallow merging and inform the user of this.
        alert("All 3 hours in the interval must be equal for the interval to be merged!");
        // Abort the method.
        return;
      }
    }
    // Check if the cell is currently in a merged state.
    else {
      // Split the 3-hour interval n on day m.
      newCells[m][n] = !newCells[m][n];
    }

    // Save the changes into cellStates so that the state of the page changes.
    setCellStates(newCells);

  }

  /*
    dataChangeHandler() modifies tableState based on the value in the cell that the function
    is being called for.

    Parameters: 
      "isSame" represents if the cell is merged or not
      "day" represents the day
      "time" represents the hour
      "newInput" represents the value that the user enters in the text field or slider in the cell.
  */
  let dataChangeHandler = (isSame, day, time, newInput) => {

    // Make a copy of tableState and store it in tempState (which will be modified).
    let tempState = [...tableState];
    
    // Check if newInput is not a valid number.
    if (isNaN(newInput)) {
      // If so, save newInput as -1 (which later saves a cell without a value, and displayed as "-").
      newInput = -1;
    }

    // Check if newInput is higher than the maximum possible value that can be entered (which the user sets).
    if (newInput > maxValue) {
      // If so, alert the user about this.
      alert("Please enter a value smaller than the maximum value!")
      // Abort the function.
      return;
    }

    // Check if newInput is equal to 0.1.
    if (newInput == 0.1) {
      // Because the minimum value in the slider input is 0.1, set newInput to 0 if it is equal to 0.1.
      newInput = 0;
    }
    
    // Check if the cell IS merged and if newInput is valid and NOT -1.
    if (isSame == true && (!isNaN(newInput) || newInput == -1)) {
      /*
        If so, change the value at day "day" and hours 3*"time", 3*"time"+1, and 3*"time"+2 
        to newInput/maxValue. This ensures that all the hours in the 3-hour
        interval are modified to the new value the user enters (as a FRACTION
        of the maximum possible value).
      */
      tempState[day][time] = newInput/maxValue;
      tempState[day][time+1] = newInput/maxValue;
      tempState[day][time+2] = newInput/maxValue;
    }

    // Check if the cell is NOT merged and if newInput is valid and NOT -1.
    else if (!isNaN(newInput) || newInput == -1) {
      /*
        Change the value at day "day" and hour "time" to newInput/maxValue.
        This ensures that the value in the cell is modified to the new value the 
        user enters (as a FRACTION of the maximum possible value).
      */
      tempState[day][time] = newInput/maxValue;
    }
    
    // Save the table with modified cells (in tempState) to tableState, so that the state of the page changes.   
    setTableState(tempState);
    
  }
  /*
    returnCell() takes in the day, the 3-hour interval range, inpBool (representing whether
    the input is merged or not), and the user-set max value to return a cell in the
    data table.
  */
  let returnCell = (day, range, inpBool, max) => {

    /*
      temp1, temp2, and temp3 store the values in cells on day "day" and hour 3*"range", 3*"range"+1,
      and 3*"range"+2 to DISPLAY. This MEANS they are equal to "-" if there is no corresponding value 
      in tableState[] (meaning the value is -1).
    */
    let temp1 = returnValue(max*tableState[day][3*range]);
    let temp2 = returnValue(max*tableState[day][1+3*range]);
    let temp3 = returnValue(max*tableState[day][2+3*range]);

    // def1, def2, and def3 represent the colors of the text boxes in the 3 aforementioned cells.
    let def1 = "white";
    let def2 = "white";
    let def3 = "white";

    // sl1, sl2, and sl3 represent the colors of the sliders in the 3 aforementioned cells.
    let sl1 = "red";
    let sl2  = "red";
    let sl3 = "red";

    // Check if the input mode is a text field.
    if (switchStates[day][range] == false) {

      // If the input mode is a text field, then check if the cells are merged.
      if (inpBool == true) {
      
        // Return a merged text field.
        return (
          // Container REPRESENTING the cell with a merged text field.
          <div id="cellMode1">
            
            {/* Text field value "temp1", color "def1", and dataChangeHandler() to update tableState when the input changes. */}
            <input id="inp1" type="text" style={{backgroundColor: def1}} value={temp1} onChange={(e) => {dataChangeHandler(true, day, 3*range, e.target.value); }}></input>
            
            {/* Option to split the cell into 3 different cells, executed by changeCellStates(). */}
            <button class="btn btn-primary" id="btn1" onClick={() => {changeCellStates(day, range)}}>Split</button>
          
          </div>
        );
      }

      // If the input mode is a text field, then check if the cells are split.
      else  {
          // Return a split text field.
          return (
            // Container REPRESENTING the cell with a split text field.
            <div id="cellMode2">
              
              {/* Text field for the cell with the value in tableState[day][3*range]. */}
              <input id="inp2" type="text" style={{backgroundColor: def1}} value={temp1} onChange={(e) => dataChangeHandler(false, day, 3*range, e.target.value)}></input>
              
              {/* Text field for the cell with the value in tableState[day][1+3*range]. */}
              <input id="inp2" type="text" style={{backgroundColor: def2}} value={temp2} onChange={(e) => dataChangeHandler(false, day, 1+3*range, e.target.value)}></input>
              
              {/* Text field for the cell with the value in tableState[day][2+3*range]. */}
              <input id="inp2" type="text" style={{backgroundColor: def3}} value={temp3} onChange={(e) => dataChangeHandler(false, day, 2+3*range, e.target.value)}></input>
              
              {/* Option to merge the 3 cells cell into 1 cell cells, executed by changeCellStates(). */}
              <button class="btn btn-success" id="btn2" onClick={() => {changeCellStates(day, range)}}>Merge</button>
            
            </div>
          );
      }
    }

    // Check if the input mode is a slider.
    else {
      // If the input mode is a slider, then check if the cells are merged.
      if (inpBool == true) {

        // Return a merged slider.
        return (

          // Container REPRESENTING the cell with a merged slider.
          <div id="cellMode1">
            
            {/* Slider with label of displaySliderValue() and updates tableState[] when the input is changed (dataChangeHandler() is called) */}
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
            
            {/* Option to split the cell into 3 different cells, executed by changeCellStates(). */}
            <button class="btn btn-primary" id="btn1" onClick={() => {changeCellStates(day, range)}}>Split</button>
          
          </div>
        );
      }

      // If the input mode is a slider, then check if the cells are split.
      else  {

        // Return a split slider.
        return (

          // Container REPRESENTING the cell with a split slider.
          <div id="cellMode2">
            
            {/* Slider for the cell with the value in tableState[day][3*range]. */}
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

            {/* Slider for the cell with the value in tableState[day][1+3*range]. */}
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

            {/* Slider for the cell with the value in tableState[day][2+3*range]. */}
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

            {/* Option to merge the 3 cells cell into 1 cell cells, executed by changeCellStates(). */}
            <button class="btn btn-success" id="btn2" onClick={() => {changeCellStates(day, range)}}>Merge</button>
          
          </div>
        );
      }
    }
  }

  /*
    retTimeSlots() stores 8AM, 9AM, 10AM ... 7AM, 8AM in an array and returns it.
  */
  const retTimeSlots = () => {
    
    let timeSlots = [];
    for (let hour = 8; hour <= 31; hour++) {
        let time = hour % 24 % 12 === 0 ? 12 : hour % 24 % 12;
        let suffix = hour % 24 < 12 || hour % 24 === 0 ? 'AM' : 'PM';
        timeSlots.push(`${time}${suffix}`);
    }
    timeSlots.push("8AM");

    return timeSlots;
  }

  /*
    retDefaultDataHours() returns a button group of checkboxes for which hours the
    user selects to enter a default value for.
  */
  let retDefaultDataHours = () => {

    // Store the hours of each day in timeSlots[].
    let timeSlots = retTimeSlots()

    // Create a checkbox for each slot in timeSlots[].
    return timeSlots.map((slot, index) => {
      const timeRange = `${timeSlots[index]}-${timeSlots[index + 1]}`;
      if (index == timeSlots.length-1) {
        return;
      }
      else {
        return (
          <React.Fragment>
              <input type="checkbox" class="btn-check" id={`btncheck${index}`} autocomplete="off" value = {timeRange} onChange={(e) => {handleCheckboxChange(e,true)}}></input>
              <label class="btn btn-outline-dark" for={`btncheck${index}`}>
                  {timeSlots[index]}-{timeSlots[index+1]}
              </label>
          </React.Fragment>
        );
      }
    });


  }

  /*
    retDayList() creates an array with the Date object indices representing days of the week starting from today.
  */

  const retDayList = () => {

    let dayList = [];
    let copyDate = new Date(Now);
    let tempDate = new Date(copyDate);
    for (let i = 0; i < 7; i++) {
      tempDate.setDate(copyDate.getDate()+i);
      dayList.push(tempDate.getDay());
    }

    return dayList;
  }


  /*
    retDefaultDays() returns a button group of checkboxes for which days of the week
    the user selects to enter a default value for.
  */
  let retDefaultDays = () => {

    // Use retDayList() to store the weekdays from today for this week. 
    let dayList = retDayList();

    // Store the days of the week in possibleDays[], where dayList[] can be used as an index.
    const possibleDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Iterate through dayList[] to create a checkbox for each day of the week, starting from today.
    return dayList.map((currentDay, index) => {
      const currDay = `${possibleDays[dayList[index]]}`;
      return (
        <React.Fragment>
            <input type="checkbox" class="btn-check" id={`btndaycheck${index}`} autocomplete="off" value = {currDay} onChange={(e) => {handleCheckboxChange(e,false)}}></input>
            <label class="btn btn-outline-dark" for={`btndaycheck${index}`}>
                {possibleDays[dayList[index]]}
            </label>
        </React.Fragment>
      );
    });

  }


  /*
    saveAllChanges() stores the current data into toSave to be saved in the backend. 
  */
  let saveAllChanges = () => {
    // Create a copy of tableState and store it in tempSave.
    let tempSave = [...tableState];
    // Save the changes into toSave so that the state of the page changes.
    setToSave(tempSave);

  }

  // Store today's date in the variable "today", which is used in retDate().
  let today = new Date();

  // Store today's date in "Now", which is used in the JSX code.
  let Now = today;

  /*
    retDate() uses date and offset as parameters to return a calendar of the week.
    The function uses a temporarily variable "nest" which uses offset as a parameter to
    return a new date. The offset here depends on which column of the calender the
    function is being called for.
  */
  function retDate (date, offset) {

    // Get today's date, store it in tod.
    const tod = date;

    // Create a copy of today's date, store it in next.
    const next = new Date(tod);

    // Using offset (which is basically the column number), set next to be the date for that column.
    next.setDate(tod.getDate()+offset);

    // Here, "current" stores the day (a number from 0 to 6) that "next" represents.
    let current = next.getDay();

     /* 
        Return a paragraph tag containing the 3-letter day (CONDITIONALLY) as well as the 
        date represented by "next".
    */
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
    // Container for entire page. Gradient image used for background.
    <div style={{backgroundImage: "linear-gradient(45deg, #708090, #2F4F4F)"}}>

      {/* Container for header. Fixed position and takes up ENTIRE width, and overlapped over everything else (z-index = 10). */}
      <div style={{position: "fixed", width: "100%", zIndex: "10", boxShadow: "2px 2px 3px 4px"}}>
        
        {/* Header tag. Type = 1 indicates that the "Add Data" button is bolded. */}
        <Header type="10"></Header>
      </div>

      {/* Container for page body (so everything besides the Header and Footer). */}
      <Container id="wholeContainer">

        {/* Title of the page as a <h2> tag. */}
        <h2 className="chatTitle">
            Enter Default Data
        </h2>

        <br></br>

        <br></br>

        {/* Contains the option to set a maximum value, directions, buttons, and daily defaults selection. */}
        <div id = "dataBtns">

          {/* Card containing the contents (inner container). */}
          <div class="card bg-warning" id="theDirections">

            {/* Card Header, which is a container for the title of the card. */}
            <div class="card-header">

              {/* Title stored in <h5> tag. */}
              <h3>
                Directions:
              </h3>

            </div>

            {/* Body of the directions card. */}
            <div class="card-body">
              
              {/* ALL of the directions stored in a <p> tag. */}
              <strong>
                <ul>
                  <li>
                    Each cell represents a time range for a specific day.
                  </li>
                  <li>
                    In each cell, enter a number less than the maximum value. This value represents how free you are in that time range.
                  </li>
                  <li>
                    If you want to clear the cell, enter any NON-NUMERIC key. Any letter or symbol would suffice.
                  </li>
                  <li>
                    The time ranges for each cell can either be 3 hours or 1 hour. 
                  </li>
                  <li>
                    Click the "Split" button to enter a specific value for each hour. If you want to revert back, click the "Merge" button (this ONLY works if the cells in all 3 hours in the range are the same).
                    <ul>
                      <li>
                        For example, suppose for a specific day, if you have a value of "3" for 8AM-9AM, "0" for 9AM-10AM, and "2" for 10AM-11AM, then "Merge" on that cell won't work! 
                      </li>
                      <li>
                        However, if you had a value of "3" for 8AM-9AM, 9AM-10AM, and 10AM-11AM, then "Merge" on that cell will work.
                      </li>
                    </ul>
                  </li>
                  <li>
                    A hiphen ("-") means there is no data entered in the cell yet.
                  </li>
                  <li>
                    Click the "Switch Input" button to toggle between text and slider input options.
                  </li>
                </ul>
              </strong>

            </div>

            {/* Card Footer, which is a container storing the link to the "Help" page. */}
            <div class="card-footer">

              <br></br>

              {/* Group of buttons to give users more help, save all data, and set a daily default. */}
              <div id = "buttonGroup">
                {/* Button leading users to the "Help" page. */}
                <button id="aDataBtn" class="btn btn-dark btn-large">
                  Click for More Help
                </button>

                {/* Button to save ALL of the data in the page, where values in tableState are stored in toSave using saveAllChanges(). */}
                <button id="aDataBtn" class="btn btn-dark btn-large" onClick={saveAllChanges}>
                  Save All Data
                </button>

                {/* Button taking users to the profile page. */}
                <Link
                      style={{textDecoration: "none", color: "white"}}
                      to={"/profile"}
                      state={{username: "", password: "", scr: 10}}
                >
                    <button id="aDataBtn" class="btn btn-dark btn-large">
                      Visit Profile
                    </button>
                </Link>
                
              </div>

              <br></br>

              {/* Card for the user to enter daily defaults. */}
             <div class = "card bg-warning" id = "defaultEntryContainer">
                <div class = "card-header">
                  <h4>
                    <strong>
                      Enter Daily Defaults
                    </strong>
                  </h4>
                </div>
                <br></br>
                {/* Container for selection options for default data. */}
                <div id = "defaultSelectionContainer">
                  {/* Checkbox for which hours to enter the default value for. */}
                  <div class = "card" id = "defaultDataEntryCard">
                    <div class = "card-header"> 
                      <h6>
                        Select time ranges
                      </h6>
                    </div>
                    <div class = "card-body">
                      <div class="btn-group-vertical w-100" id = "dataHoursContainer" role="group" aria-label="default data hours">
                        {retDefaultDataHours()}
                      </div>
                    </div>
                  </div>
                  <br></br>
                  {/* Checkbox for which days to enter the default value for. */}
                  <div class = "card" id = "defaultDataEntryCard">
                    <div class = "card-header">
                      <h6>
                        Select days of the week
                      </h6>
                    </div>
                    <div class = "card-body">
                      <div class="btn-group-vertical w-100" id = "dataDaysContainer" role="group" aria-label="default data days">
                        {retDefaultDays()}
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                {/* Container for form enabling users to enter the value to be assigned all default cell selections. */}
                <div class = "alert bg-dark" id = "defaultEntryInput">
                  <form>
                    <h6 class = "text-light">
                      During every week, on the selected days and times, the amount that I am free is 
                      {"  "}
                      <input 
                          id = "defInputTextbox" 
                          type = "number" 
                          min={0} 
                          max={maxValue} 
                          value = {currentDefault}
                          onChange={(e) => {if (e.target.value <= maxValue) {setCurrentDefault(e.target.value)}}}
                      />
                      {"  "}
                      out of {maxValue}, so 
                      {"  "}
                      <input 
                          id = "defPercentBox" 
                          type = "number" 
                          min={0} 
                          max={100} 
                          value = {(currentDefault/maxValue)*100}
                          onChange={(e) => {if (e.target.value <= 100) {setCurrentDefault((e.target.value)*maxValue/100)}}}
                      />
                      {"  "}
                      %.
                    </h6>
                    <input id = "defDataSubmitBtn" type = "submit" onClick={(e) => {e.preventDefault(); populateDailyDefaults();}}></input>
                  </form>
                </div>
             </div>

              <br></br>

              {/* Card for the user to set a maximum input value. */}
              <div class="card" id = "maxDataCard">

                {/* Card body for the user to set a maximum input value. */}
                <div class="card-body card-primary" id = "maxDataBody">

                  {/* Title of the card. */}
                  <h5 class="card-title" style={{color: "#FFD700"}}>
                    Set the maximum value:
                  </h5>

                  {/* Paragraph tag to explain the maximum value card. */}
                  <p style={{color: "yellow", textAlign: "center", marginTop: "10px"}}>
                    This value represents how free you can possibly get!
                  </p>

                  <br></br>

                  {/* Input field for the user to set the maximum value. Stores input in tempMaxValue using setTempMaxValue().  */}
                  <input type="text" id="maxEntryForm" defaultValue={maxValue} onChange={(e) => setTempMaxValue(e.target.value)}></input>
                  
                  <br></br>
                  
                  <br></br>

                  {/* Button to store the value in tempMaxValue to maxValue using changeMaxValue(). */}
                  <button class="btn btn-warning" onClick={changeMaxValue}>Submit</button>
                  
                  <br></br>
                  
                  {/* Indicates the current maximum input value. */}
                  <h5 style={{color: "#FFD700"}}>
                    The current maximum is {maxValue}.
                  </h5>

                   {/* Inform the user about changes in table values. */}
                  <h6 style={{color: "#FFD700"}}>
                    Changing the maximum causes all table field values will change proportionally.
                  </h6>
                
                </div>
              
              </div>

              <br></br>

            </div>

          </div>
          
          <br></br>
          
          <br></br>
        
        </div>
        
        <br></br>
        
        <br></br>
        
        {/* Card containing the ENTIRE data table. */}
        <div class="card" className="tableContainer">

          {/* Data table with input fields for users to enter their data. */}
          <table class="table table-dark table-bordered" id = "dataTable">
            
            {/* Container for top row of the table. */}
            <thead>
              
              {/* Top row of the table showing all of the dates. */}
              <tr>
                
                {/* Title of top row. */}
                <th scope="col"><p>Time Range</p></th>
                
                {/* Dates for today and the next 6 days (so basically the week starting from today). */}
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
              
              {/* Row for 8AM-9AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">
                  8AM-9AM
                </th>

                {/* 
                  Remaining cells containing the input fields for every day AT this hour. 
                  NOTE: Every cell in this row can split into 3 cells to accomodate the next
                  2 hours. If the cell is not split, then the SAME cell is used for this hour
                  AND the next 2 hours AND the "Merge" button (which is in the same row as the 
                  "Switch Input" button).
                */}
                <td rowspan="4">{returnCell(0,0, cellStates[0][0], maxValue)}</td>
                <td rowspan="4">{returnCell(1,0, cellStates[1][0], maxValue)}</td>
                <td rowspan="4">{returnCell(2,0, cellStates[2][0], maxValue)}</td>
                <td rowspan="4">{returnCell(3,0, cellStates[3][0], maxValue)}</td>
                <td rowspan="4">{returnCell(4,0, cellStates[4][0], maxValue)}</td>
                <td rowspan="4">{returnCell(5,0, cellStates[5][0], maxValue)}</td>
                <td rowspan="4">{returnCell(6,0, cellStates[6][0], maxValue)}</td>
              </tr>

              {/* Row for 9AM-10AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">9AM-10AM</th>
              
              </tr>

              {/* Row for 10AM-11AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">10AM-11AM</th>
              
              </tr>

              {/* Row containing the "Switch Input" button. */}
              <tr>

                {/* Cell containing the "Switch Input" button. */}
                <th scope="row" id="switchPlace">
                  
                  {/*
                    The "Switch Input" button which uses changeSwitchStates() to switch from slider to 
                    text OR text to slider for the WHOLE row (which is the parameter).  
                  */}
                  <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(0)}>Switch Input</button>
                
                </th>
              
              </tr>

              {/* Row for 11AM-12PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">11AM-12PM</th>

                {/* 
                  Remaining cells containing the input fields for every day AT this hour. 
                  NOTE: Every cell in this row can split into 3 cells to accomodate the next
                  2 hours. If the cell is not split, then the SAME cell is used for this hour
                  AND the next 2 hours AND the "Merge" button (which is in the same row as the 
                  "Switch Input" button).
                */}
                <td rowspan="4">{returnCell(0,1, cellStates[0][1], maxValue)}</td>
                <td rowspan="4">{returnCell(1,1, cellStates[1][1], maxValue)}</td>
                <td rowspan="4">{returnCell(2,1, cellStates[2][1], maxValue)}</td>
                <td rowspan="4">{returnCell(3,1, cellStates[3][1], maxValue)}</td>
                <td rowspan="4">{returnCell(4,1, cellStates[4][1], maxValue)}</td>
                <td rowspan="4">{returnCell(5,1, cellStates[5][1], maxValue)}</td>
                <td rowspan="4">{returnCell(6,1, cellStates[6][1], maxValue)}</td>
              
              </tr>

              {/* Row for 12PM-1PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">12PM-1PM</th>
              
              </tr>

              {/* Row for 1PM-2PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">1PM-2PM</th>
              
              </tr>

              {/* Row containing the "Switch Input" button. */}
              <tr>

                {/* Cell containing the "Switch Input" button. */}
                <th scope="row" id="switchPlace">

                  {/*
                    The "Switch Input" button which uses changeSwitchStates() to switch from slider to 
                    text OR text to slider for the WHOLE row (which is the parameter).  
                  */}
                  <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(1)}>Switch Input</button>
                
                </th>
              
              </tr>

              {/* Row for 2PM-3PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">2PM-3PM</th>

                {/* 
                  Remaining cells containing the input fields for every day AT this hour. 
                  NOTE: Every cell in this row can split into 3 cells to accomodate the next
                  2 hours. If the cell is not split, then the SAME cell is used for this hour
                  AND the next 2 hours AND the "Merge" button (which is in the same row as the 
                  "Switch Input" button).
                */}
                <td rowspan="4">{returnCell(0,2, cellStates[0][2], maxValue)}</td>
                <td rowspan="4">{returnCell(1,2, cellStates[1][2], maxValue)}</td>
                <td rowspan="4">{returnCell(2,2, cellStates[2][2], maxValue)}</td>
                <td rowspan="4">{returnCell(3,2, cellStates[3][2], maxValue)}</td>
                <td rowspan="4">{returnCell(4,2, cellStates[4][2], maxValue)}</td>
                <td rowspan="4">{returnCell(5,2, cellStates[5][2], maxValue)}</td>
                <td rowspan="4">{returnCell(6,2, cellStates[6][2], maxValue)}</td>
              
              </tr>

              {/* Row for 3PM-4PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">3PM-4PM</th>
              
              </tr>

              {/* Row for 4PM-5PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">4PM-5PM</th>
              
              </tr>
              
              {/* Row containing the "Switch Input" button. */}
              <tr>

                {/* Cell containing the "Switch Input" button. */}
                <th scope="row" id="switchPlace">
                  
                  {/*
                    The "Switch Input" button which uses changeSwitchStates() to switch from slider to 
                    text OR text to slider for the WHOLE row (which is the parameter).  
                  */}
                  <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(2)}>Switch Input</button>
                
                </th>
              
              </tr>

              {/* Row for 5PM-6PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">5PM-6PM</th>

                {/* 
                  Remaining cells containing the input fields for every day AT this hour. 
                  NOTE: Every cell in this row can split into 3 cells to accomodate the next
                  2 hours. If the cell is not split, then the SAME cell is used for this hour
                  AND the next 2 hours AND the "Merge" button (which is in the same row as the 
                  "Switch Input" button).
                */}
                <td rowspan="4">{returnCell(0,3, cellStates[0][3], maxValue)}</td>
                <td rowspan="4">{returnCell(1,3, cellStates[1][3], maxValue)}</td>
                <td rowspan="4">{returnCell(2,3, cellStates[2][3], maxValue)}</td>
                <td rowspan="4">{returnCell(3,3, cellStates[3][3], maxValue)}</td>
                <td rowspan="4">{returnCell(4,3, cellStates[4][3], maxValue)}</td>
                <td rowspan="4">{returnCell(5,3, cellStates[5][3], maxValue)}</td>
                <td rowspan="4">{returnCell(6,3, cellStates[6][3], maxValue)}</td>
              </tr>

              {/* Row for 6PM-7PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">6PM-7PM</th>
              
              </tr>

              {/* Row for 7PM-8PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">7PM-8PM</th>
              
              </tr>

              {/* Row containing the "Switch Input" button. */}
              <tr>

                {/* Cell containing the "Switch Input" button. */}
                <th scope="row" id="switchPlace">
                 
                  {/*
                    The "Switch Input" button which uses changeSwitchStates() to switch from slider to 
                    text OR text to slider for the WHOLE row (which is the parameter).  
                  */}
                  <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(3)}>Switch Input</button>
                
                </th>
              
              </tr>

              {/* Row for 8PM-9PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">8PM-9PM</th>

                {/* 
                  Remaining cells containing the input fields for every day AT this hour. 
                  NOTE: Every cell in this row can split into 3 cells to accomodate the next
                  2 hours. If the cell is not split, then the SAME cell is used for this hour
                  AND the next 2 hours AND the "Merge" button (which is in the same row as the 
                  "Switch Input" button).
                */}
                <td rowspan="4">{returnCell(0,4, cellStates[0][4], maxValue)}</td>
                <td rowspan="4">{returnCell(1,4, cellStates[1][4], maxValue)}</td>
                <td rowspan="4">{returnCell(2,4, cellStates[2][4], maxValue)}</td>
                <td rowspan="4">{returnCell(3,4, cellStates[3][4], maxValue)}</td>
                <td rowspan="4">{returnCell(4,4, cellStates[4][4], maxValue)}</td>
                <td rowspan="4">{returnCell(5,4, cellStates[5][4], maxValue)}</td>
                <td rowspan="4">{returnCell(6,4, cellStates[6][4], maxValue)}</td>
              </tr>

              {/* Row for 9PM-10PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">9PM-10PM</th>
              
              </tr>

              {/* Row for 10PM-11PM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">10PM-11PM</th>
             
              </tr>
              
              {/* Row containing the "Switch Input" button. */}
              <tr>

                {/* Cell containing the "Switch Input" button. */}
                <th scope="row" id="switchPlace">
                  
                  {/*
                    The "Switch Input" button which uses changeSwitchStates() to switch from slider to 
                    text OR text to slider for the WHOLE row (which is the parameter).  
                  */}
                  <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(4)}>Switch Input</button>
                
                </th>
              
              </tr>

              {/* Row for 11PM-12AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">11PM-12AM</th>

                {/* 
                  Remaining cells containing the input fields for every day AT this hour. 
                  NOTE: Every cell in this row can split into 3 cells to accomodate the next
                  2 hours. If the cell is not split, then the SAME cell is used for this hour
                  AND the next 2 hours AND the "Merge" button (which is in the same row as the 
                  "Switch Input" button).
                */}
                <td rowspan="4">{returnCell(0,5, cellStates[0][5], maxValue)}</td>
                <td rowspan="4">{returnCell(1,5, cellStates[1][5], maxValue)}</td>
                <td rowspan="4">{returnCell(2,5, cellStates[2][5], maxValue)}</td>
                <td rowspan="4">{returnCell(3,5, cellStates[3][5], maxValue)}</td>
                <td rowspan="4">{returnCell(4,5, cellStates[4][5], maxValue)}</td>
                <td rowspan="4">{returnCell(5,5, cellStates[5][5], maxValue)}</td>
                <td rowspan="4">{returnCell(6,5, cellStates[6][5], maxValue)}</td>
              </tr>

              {/* Row for 12AM-1AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">12AM-1AM</th>
              
              </tr>

              {/* Row for 1AM-2AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">1AM-2AM</th>
              
              </tr>
              
              {/* Row containing the "Switch Input" button. */}
              <tr>
                
                {/* Cell containing the "Switch Input" button. */}
                <th scope="row" id="switchPlace">
                  
                  {/*
                    The "Switch Input" button which uses changeSwitchStates() to switch from slider to 
                    text OR text to slider for the WHOLE row (which is the parameter).  
                  */}
                  <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(5)}>Switch Input</button>
                
                </th>
              
              </tr>

              {/* Row for 2AM-3AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">2AM-3AM</th>

                {/* 
                  Remaining cells containing the input fields for every day AT this hour. 
                  NOTE: Every cell in this row can split into 3 cells to accomodate the next
                  2 hours. If the cell is not split, then the SAME cell is used for this hour
                  AND the next 2 hours AND the "Merge" button (which is in the same row as the 
                  "Switch Input" button).
                */}
                <td rowspan="4">{returnCell(0,6, cellStates[0][6], maxValue)}</td>
                <td rowspan="4">{returnCell(1,6, cellStates[1][6], maxValue)}</td>
                <td rowspan="4">{returnCell(2,6, cellStates[2][6], maxValue)}</td>
                <td rowspan="4">{returnCell(3,6, cellStates[3][6], maxValue)}</td>
                <td rowspan="4">{returnCell(4,6, cellStates[4][6], maxValue)}</td>
                <td rowspan="4">{returnCell(5,6, cellStates[5][6], maxValue)}</td>
                <td rowspan="4">{returnCell(6,6, cellStates[6][6], maxValue)}</td>
              </tr>

              {/* Row for 3AM-4AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">3AM-4AM</th>
              
              </tr>

              {/* Row for 4AM-5AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">4AM-5AM</th>
              
              </tr>
              
              {/* Row containing the "Switch Input" button. */}
              <tr>
                
                {/* Cell containing the "Switch Input" button. */}
                <th scope="row" id="switchPlace">
                  
                  {/*
                    The "Switch Input" button which uses changeSwitchStates() to switch from slider to 
                    text OR text to slider for the WHOLE row (which is the parameter).  
                  */}
                  <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(6)}>Switch Input</button>
                
                </th>
              
              </tr>

              {/* Row for 5AM-6AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">5AM-6AM</th>

                {/* 
                  Remaining cells containing the input fields for every day AT this hour. 
                  NOTE: Every cell in this row can split into 3 cells to accomodate the next
                  2 hours. If the cell is not split, then the SAME cell is used for this hour
                  AND the next 2 hours AND the "Merge" button (which is in the same row as the 
                  "Switch Input" button).
                */}
                <td rowspan="4">{returnCell(0,7, cellStates[0][7], maxValue)}</td>
                <td rowspan="4">{returnCell(1,7, cellStates[1][7], maxValue)}</td>
                <td rowspan="4">{returnCell(2,7, cellStates[2][7], maxValue)}</td>
                <td rowspan="4">{returnCell(3,7, cellStates[3][7], maxValue)}</td>
                <td rowspan="4">{returnCell(4,7, cellStates[4][7], maxValue)}</td>
                <td rowspan="4">{returnCell(5,7, cellStates[5][7], maxValue)}</td>
                <td rowspan="4">{returnCell(6,7, cellStates[6][7], maxValue)}</td>
              </tr>

              {/* Row for 6AM-7AM. */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">6AM-7AM</th>
              
              </tr>

              {/* Row for 7AM-AAM */}
              <tr>

                {/* Title of row showing the 1-hour time interval. */}
                <th scope="row">7AM-8AM</th>
              
              </tr>
              
              {/* Row containing the "Switch Input" button. */}
              <tr>

                {/* Cell containing the "Switch Input" button. */}
                <th scope="row" id="switchPlace">
                  
                  {/*
                    The "Switch Input" button which uses changeSwitchStates() to switch from slider to 
                    text OR text to slider for the WHOLE row (which is the parameter).  
                  */}
                  <button id="defaultDataBtn" class="btn btn-info btn-sm" onClick={() => changeSwitchStates(7)}>Switch Input</button>
                
                </th>
              
              </tr>
            
            </tbody>
          
          </table>
            
        </div>

        <br></br>
        
        <br></br>
      
      </Container>
      
      {/* Footer, where type = 1 makes sure that the "Add Data" button is bolded, IF present. */}
      <Footer type="1"></Footer>
    
    </div>
  )

}

export default AddData