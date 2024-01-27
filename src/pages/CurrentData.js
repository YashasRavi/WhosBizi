import React from 'react'
import {Button} from '@mui/material';
import {Card} from '@mui/material';
import {Container} from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import "./CurrentDataStyle.css";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Slider} from '@mui/material'

const CurrentData = () =>  {

    // Array containing dummy data representing the data in every cell (represented by the color of the cell).
    let dummyTableState = [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]

    // Array containing dummy data representing the default data to be placed in every cell (if the cell currently does not have a value from dummyTableState[][]).
    let dummyDefaultData = [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, 0.5, -1, 0.7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]

    let savedTableState;

    // Array containing dummy colors that the cells will have.
    let dummyColors = []

    // Traverse every row in dummyTableState.
    for (let row = 0; row < 7; row++) {
        // Create a new row for dummyColors.
        let dummyColorsRow = [];
        // Traverse every column in dummyTableState.
        for (let col = 0; col < 24; col++) {
            // Compare if dummyTableState does NOT have a value BUT dummyDefaultData does at that row and column (meaning day and hour).
            if (dummyDefaultData[row][col] != -1) {
                // If so, set dummyTableState to that value AT the day and hour.
                dummyTableState[row][col] = dummyDefaultData[row][col];
                // Create a color corresponding to the above value.
                let origColor = {red: 255*(1 - dummyTableState[row][col]), green: 0, blue: 255*dummyTableState[row][col]}
                // Add the newly created color to the current row of dummyColors.
                dummyColorsRow.push(origColor);
            }
            else {
                let origColor = {red: 0, green: 0, blue: 0}
                dummyColorsRow.push(origColor);
            }
        }
        // Add the newly modified background colors row to dummyColors.
        dummyColors.push(dummyColorsRow);
    }

    console.log("HEY");
    //console.log(dummyColors);

    // currentTable[][] stores the current state of the data in every cell, initialized by dummyTableState[][].
    const [currentTable, setCurrentTable] = useState(dummyTableState);

    // currentBackgrounds[][] stores the color backgrounds corresponding to every element in currentTable[][].
    const [currentBackgrounds, setCurrentBackgrounds] = useState(dummyColors);

    // savedTable[][] stores the table and saves it into the user's account when the user clicks the "Save All Data" button.
    const [savedTable, setSavedTable] = useState(dummyTableState)

    // currentValue represents the value that the user will select for certain cells, represented by the cell's color.
    const [currentValue, setCurrentValue] = useState(0);

    // currentColor represents the corresponding color value of currentValue.
    const [currentColor, setCurrentColor] = useState({red: 255, green: 0, blue: 0})

    // deselect determines if the user is currently deselecting cells, meaning that they are removing data that they entered in the table. 
    const [deselect, setDeselect] = useState(false);

    const handleBeforeUnload = (e) => {
        e.preventDefault(); // prevent the default browser action
        e.returnValue = '';
    };

    useEffect(() => {
        document.querySelector("#currentDataTitle").scrollIntoView();

    }, [])

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

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

    /*
        retTableHead() returns the cells in the table header (meaning the dates and the label).
    */
    const retTableHead = () => {
        /*
            offsets[] conatains numbers from 1-7 representing how far the day represented by 
            the column is from today.
            Also contains a 0 to represent the header cell containing the table header label "Time Range".
        */
        let offsets = [0, 1, 2, 3, 4, 5, 6, 7];

        // Traverse offsets[] and return the table header label and the dates.
        return offsets.map((offset, index) => {
            // Check if offset is 0.
            if (offset == 0) {
                // If so, return the label ("Time Range "). 
                return (
                    <th scope="col">
                        {/* Title of cell. */}
                        <p>
                            Time Range
                        </p>
                    </th>
                    
                );
            }
            // Check if the offset is greater than 0.
            else {
                // Dates for today and the next 6 days (so basically the week starting from today).
                return (
                    <th scope="col">
                        {/* Date displayed in cell. */}
                        {retDate(Now, offset)}
                    </th>
                );
            }
            
        }); 
    }

    /*
        retTime() takes an input (ind) and returns the corresponding time.
        Here, ind represents the hour from 0 to 24 in the whenFree[] array 
        (meaning the data[tableIndex] array), and also returns if it is PM or AM. 
    */
    const retTime = (ind) => {
        /*
            Conversion:
            0 < ind < 12 means AM (ex: 3 AM)
            ind = 12 means PM (ex: 12 PM)
            12 < ind < 24 means PM (ex: 4 PM)
            ind = 24 means AM (ex: 12 AM) 
        */
        if (ind < 12) {
            return <p>{ind} AM</p>;
        }
        else if (ind == 12) {
            return <p>{ind} PM</p>
        }
        else if (ind > 12 && ind < 24) {
            return <p>{ind-12} PM</p>;
        } 
        else if (ind == 24) {
            return <p>{ind-12} AM</p>;
        }
        else {
            return <p>{ind-24} AM</p>;
        }
        
    }

    const deselectText = () => {
         
        if (deselect == false) {
            return (
                <h6>
                    Deselect Cells
                </h6>
            )
        }
        else {
            return (
                <h6>
                    Select Cells
                </h6>
            )
        }

    }

    const toggleDeselect = () => {
        // If the user is selecting cells (meaning deselect is false), allow the user to deselect cells.
        if (deselect == false) {
            setDeselect(true);
            let deselectColor = {
                red: 0,
                green: 0,
                blue: 0   
            }
            // WE DO NOT CHANGE currentValue so the user can select cells from the previously chosen color before deselecting cells.
            setCurrentColor(deselectColor);
        }
        // If the user is deselecting cells (meaning deselect is true), allow the user to select cells.
        else {
            setDeselect(false);
            colorChangeHandler();
        }
    }

    const clearData = () => {
        let clearedData = [];
        let clearedBackgrounds = [];

        // Traverse every row in clearedData.
        for (let row = 0; row < 7; row++) {
            // Create a new row for clearedBackgrounds.
            let clearedBackgroundsRow = [];

            let clearedDataRow = []
            // Traverse every column in clearedData.
            for (let col = 0; col < 24; col++) {
                // Prepare to remove the data in the cell corresponding to currentTable by setting the value in clearedData to -1.
                clearedDataRow.push(-1);
                // Store the cleared data color as black.
                let clearedColor = {red: 0, green: 0, blue: 0}
                // Prepare to remove the background in the cell corresponding to currentTable by setting the color in clearedBackgrounds to black.
                clearedBackgroundsRow.push(clearedColor);
            }

            clearedData.push(clearedDataRow);
            // Add the newly modified background colors row to clearedBackgrounds.
            clearedBackgrounds.push(clearedBackgroundsRow);

        }

        setCurrentTable(clearedData)
        setCurrentBackgrounds(clearedBackgrounds)
    }

    const colorChangeHandler = () => {
        let redIntensity = 255 - (Math.round(currentValue)/100)*255;
        let greenIntensity = 0 + 0;
        let blueIntensity = 0 + (Math.round(currentValue)/100)*255;

        let newColor = {
            red: redIntensity,
            green: greenIntensity,
            blue: blueIntensity
        }

        setCurrentColor(newColor);

    }

    const retColor = () => {
        
        return (
            {backgroundColor: `rgb(${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`}
        );
    }

    const retBackground = (day, hour) => {
        let colorToFill = currentBackgrounds[day][hour];
        return (
            {
                backgroundColor: `rgb(${colorToFill.red}, ${colorToFill.green}, ${colorToFill.blue})`,
                transition: "background-color 0.3s ease-in"
            }
        )
    }

    const cellContent = (day, hour) => {
        if (currentTable[day][hour] == -1) {
            return (
                <p>No data yet!</p>
            )
        }
        else {
            return (
                <p>{Math.round(100*currentTable[day][hour])}% free!</p>
            )
        }
    }

    const cellClickHandler = (day, hour, value) => {

        let tempTable = [...currentTable];
        let tempColors = [...currentBackgrounds];

        if (deselect == true) {
            tempTable[day][hour] = -1;
            let tempColor = {
                red: 0,
                green: 0,
                blue: 0
            }
            tempColors[day][hour] = tempColor;
        }

        else {
            // Value is -1 only when clearData() is called to remove data from all cells (meaning turn ALL values to -1). 
           if (value == -1) {
            tempTable[day][hour] = -1;
            let tempColor = {
                red: 0,
                green: 0,
                blue: 0
            }
            tempColors[day][hour] = tempColor;
           }
           else {
                tempTable[day][hour] = Math.round(value)/100;
                let tempColor = {
                    red: (1 - tempTable[day][hour])*255,
                    green: 0,
                    blue: tempTable[day][hour]*255
                }
                tempColors[day][hour] = tempColor;
           }
        }

        setCurrentTable(tempTable);
        setCurrentBackgrounds(tempColors);

    }

    /*
        retTableRow() returns the cells in every row of the table.
    */
    const retTableRow = (hour) => {
        // Create an array where every element consecutively represents a day of the week (ex: 0 = today, 1 = tommorrow, etc).
        let dayIndices = [0, 1, 2, 3, 4, 5, 6]; 

        // Traverse dayIndices[] to return a cell for every day in the array.
        return dayIndices.map((dayIndex, index) => {
            // Return a cell for every day.
            return (
                <td 
                    id = "tableCellContents"
                    style = {retBackground(dayIndex, hour)} 
                    onClick={() => {cellClickHandler(dayIndex, hour, currentValue)}}
                >
                    {/* Container for the contents of each cell. */}
                    <div>
                        {cellContent(dayIndex, hour)}
                    </div>
                </td>
            );
        });

    }

    /*
        retTableBody() returns a 1-hour time range and a row of cells containing the value for that time range (displayed as a color).
    */
    const retTableBody = () => {
        // Create an array for every hour in the military system and use retTime() later to return the corresponding regular time (and also AM or PM).
        let timeRangeIndices = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7] 
        
        // Return a row for every time range.
        return timeRangeIndices.map((timeRangeIndex, index) => {
            // Return a row.
            return (
                <tr>
                    {/* Return a header cell for each row containing the time range. */}
                    <th id = "timeIndicatorCell">
                        {/* Use retTime() to return the time range, using the number at timeRangeIndices[index]. */}
                        {retTime(timeRangeIndex)}
                    </th>
                    {/* Return a row of cells for EVERY time range using retTableRow(). */}
                    {retTableRow(timeRangeIndex-1)}
                </tr>
            );
        });
    }

     /*
        saveAllChanges() stores the current data into savedTable to be saved in the backend. 
    */
    const saveAllChanges = () => {
        let tempSavedTable = [...currentTable];
        setSavedTable(tempSavedTable);
    }

    /*
        retSpacing() returns some break statements to increase spacing between the HTML elements.
    */
    const retSpacing = () => {
        // Return 2 break tags.
        return (
            // INVISIBLE container for the 2 break tags.
            <React.Fragment>
                <br></br>
                <br></br>
            </React.Fragment> 
        );
    }

    return (
        // Container with ALL of the contents.
        <div id = "currentDataContents" style={{backgroundImage: "linear-gradient(45deg, #708090, #2F4F4F)"}}>

            {/* Container for header. Fixed position and takes up ENTIRE width, and overlapped over everything else (z-index = 10). */}
            <div style={{position: "fixed", width: "100%", zIndex: "10", boxShadow: "2px 2px 3px 4px"}}>
                
                {/* Header tag. Type = 1 indicates that the "Add Data" button is bolded. */}
                <Header type="1"></Header>
            </div>

            {/* Provide spacing. */}
            {retSpacing()}
            {retSpacing()}

            {/* Contain for the title of the page. */}
            <div>
                {/* Title of the page. */}
                <h2 id = "currentDataTitle">
                    Enter when you are free!
                </h2>
            </div>

            

            {/* Provide spacing. */}
            {retSpacing()}
       
            <div class = "card bg-dark" id = "gradientCard">
                <div class = "card-header">
                    <h4>
                        Choose a value!
                    </h4>
                </div>
                <div class = "card-body" id = "gradientCardBody">
                    
                    <div>
                        {retSpacing()}

                        <div id = "tableColorGradient">

                        </div>

                        {retSpacing()}

                        <Slider 
                            min={0}
                            max={100}
                            value={currentValue}
                            disabled={deselect}
                            onChange={(e) => {setCurrentValue(e.target.value); colorChangeHandler()}}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                            sx = {{
                                width: "100%"
                            }}
                        />

                        {retSpacing()}
                        
                        <form>
                            <h5>
                                Now, select all of the days and times in the table when you are 
                                {"  "}
                                <input 
                                    id = "valueSelect" 
                                    type = "number" 
                                    disabled = {deselect}
                                    min={0} 
                                    max={100} 
                                    value = {currentValue}
                                    onChange={(e) => {if(e.target.value <= 100) {setCurrentValue(e.target.value)} else {setCurrentValue(100)}; colorChangeHandler()}}
                                />
                                {"  "}
                                % free!
                            </h5>
                        </form>
                        

                        {retSpacing()}

                        <div class = "card" style={retColor()}>
                            <div class = "card-header">
                                <h5>
                                    The cells that you select will be colored in this background!    
                                </h5> 
                            </div>
                        </div>

                        {retSpacing()}

                    </div>           
                    
                </div>
                <div class = "card-footer" id = "gradientCardFooter">
                    <button class="btn btn-warning" id = "gradientButton">
                        {/* Link for the user to go to the "Add Data" page. */}
                        <Link
                            style={{textDecoration: "none", color: "black"}}
                            to={"/addData"}
                            state={{username: "", password: ""}}
                        >   
                            <h6>
                                Enter Default Data
                            </h6>
                        </Link>   
                    </button>
                    <button class="btn btn-warning" id = "gradientButton" onClick={() => {clearData()}}>
                        <h6>
                            Clear All Data
                        </h6>
                    </button>
                    <button class="btn btn-warning" id = "gradientButton" onClick={() => {toggleDeselect()}}>
                        {deselectText()}
                    </button>
                </div>
                
                <div class = "card-footer">
                    <div class="alert alert-info" role="alert">
                        <p>
                            <strong>
                                Make sure to save your data before exiting the page!
                            </strong>
                        </p>
                        <button class = "btn btn-primary btn-lg" onClick={saveAllChanges}>
                            Save Data
                        </button>
                    </div>
                </div>
            </div>

            {/* Provide spacing. */}
            {retSpacing()}

            {/* Card containing the ENTIRE data table. */}
            <div class = "card" id = "dataTableCard">
                {/* Data table with input fields for users to enter their data. */}
                <table class="table table-dark table-bordered" id = "currentDataTable">

                    {/* Container for top row of the table. */}
                    <thead>
                        {/* Top row of the table showing all of the dates. */}
                        <tr>
                            {/* Table header containing the label and the dates of every day of the week FROM today. */}
                            {retTableHead()}
                        </tr>
                    </thead>

                    {/* Container with the REST of the rows in the data table. */}
                    <tbody>
                        {/* Return the rest of the rows using retTableBody(). */}
                        {retTableBody()}
                    </tbody>

                </table>
            </div>

            {retSpacing()}
            {retSpacing()}

            {/* Footer, where type = 1 makes sure that the "Add Data" button is bolded, IF present. */}
            <Footer type="1"></Footer>
            
        </div>

    )

}

export default CurrentData