import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import "./FriendGridStyle.css";
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const FriendGrid = ({array}) => {

  // Array of friend objects passed from UserProfile page as a prop
  let friends = array;
  
  // Index represents the ID of any friend listed in the table. Starts from friend with ID = 0.
  const [index, setIndex] = useState(0);

  // Current page of table. Every page lists 5 names, so the current page (which is 1) would list the first 5 names.
  const [currentPage, setCurrentPage] = useState(1);

  // Search input for search field, initally set to an empty string.
  const [nowSearch, setSearchInput] = useState("");

  // date stores today's date.
  const date = new Date();

  // day stores today's day as a number (sun - 0, mon - 1, etc)
  let day = date.getDay();
  
  /*
    getDay() basically converts the day number (current) to the corresponding 3-letter paragraph tag.
  */
  function getDay (current) {
    if (current == 0) {
      return <p>Sun</p>;
    }
    if (current == 1) {
      return <p>Mon</p>;
    }
    if (current == 2) {
      return <p>Tue</p>;
    }
    if (current == 3) {
      return <p>Wed</p>;
    }
    if (current == 4) {
      return <p>Thu</p>;
    }
    if (current == 5) {
      return <p>Fri</p>;
    }
    if (current == 6) {
      return <p>Sat</p>;
    }
  }

  /* 
    updateArrows() uses the parameter i (representing the index of the first friend in the page) to determine whether 
    the left or right arrow should be usable. Left only unusable if first page (i = index of first friend) and right
    only unusable if last page (i = index of LAST friend minus 5)
  */
  function updateArrows (i) {
    // When right arrow is disabled, when user is on last page.
    if (i+5 >= friends.length) {
      document.querySelector("#arrowRight").style.opacity="50%";
    }
    else {
      document.querySelector("#arrowRight").style.opacity="100%";
    }

    // When front arrow is disabled, when user is on first page.
    if (i < 5) {
     document.querySelector("#arrowLeft").style.opacity="50%";
    }
    else {
      document.querySelector("#arrowLeft").style.opacity="100%";
    }
  }

  /*
    rightArrowClick() increases the index by 5 and currentPage by 1, which shifts the user
    to the next page in the table while displaying the NEXT 5 friends. 
  */
  function rightArrowClick () {
    // Test if right arrow is NOT disabled.
    if (index+5 < friends.length) {
      // Makes sure showFriends() will display next 5 friends.
      setIndex(index+5); 
      // Takes user to next page in the table.
      setCurrentPage(currentPage+1);
    } 
  }

  /*
    leftArrowClick() decreases the index by 5 and currentPage by 1, which shifts the user
    to the previous page in the table while displaying the PREVIOUS 5 friends. 
  */
  function leftArrowClick () {
    // Test if left arrow is NOT disabled.
    if (index >= 5) {
      // Makes sure showFriends() will display previous 5 friends.
      setIndex(index-5);
      // Takes user to previous page in the table.
      setCurrentPage(currentPage-1);
    }
  }

  // useEffect() is required so that the state of the page is modified WHEN index changes. 
  useEffect(() => {
    updateArrows(index);
  }, [index])

  /*
    showFriends() returns a string with the friend's name if the input (inp) which represents the index if inp is LESS 
    than friends.length, and a button to add more friends (links to Edit Details page) if inp >= friends.length.
    Also trims the friends name as output if the length is greater than 26 characters.
  */
  function showFriends (inp) {
    
    // Extract friends' name if the index is less than number of friends (max index)
    if (inp < friends.length) {
      
      // Initialize a variable retName that will store the trimmed username if it is more than 25 characters.
      let tempName = friends[inp].username;
      let retName = "";

      // Trims the friends' name if it is larger than 25 characters  
      if (tempName.length > 26) {
        retName = friends[inp].username.substring(0,25) + "...";
      }
      else {
        retName = tempName;
      }
      
      // Return a link tag to direct users to chat page
      return (
        <Link
          id="friendLink"
          to={"/chat"}
          state={{allFriends: friends, whichFriend: friends[inp].id}}
        >
          <p id="nameOfFriend">{retName}</p>
        </Link>
      );       
    }

    // Returns a button to add more friends if index is more than number of friends (max index)
    else {
      return (
        <Link
          style={{textDecoration: "none", color: "white"}}
          to={"/editDetails"}
          state={{username: "", password: "", scr: 2}}
        >
          <Button variant="contained" size="small">+ Add Friends</Button> 
        </Link>
      );
    }
  }
  
  /*
    showData() returns a background color representing how free a certain friend is on a certain day.
    The inputs here are k (which friend) and n (which day). The data[] array contains n arrays
    where each array has 24 elements representing how free the friend is at each hour ON that day.
    
    Using the inputs, the function averages how free friend k is on day n by summing the values of the
    array data[n] in the friends[k] object, then dividing it by the number of NONNEGATIVE numbers added.
    
    We only consider nonnegative numbers since <0 represents NO data. Using pre-determined bounds, a color is 
    returned that represents the averaged value. Note that these bounds are arbitrarilt set, as of now. 
  */
  function showData (k,n) {

    // Test if k is valid (if not, then the box is in a row with the add data button so it becomes black). 
    if (k >= friends.length) {
      return {backgroundColor: "black"};
    }

    // Using day n and friend k, take the average of the nonnegative numbers in data[n] array.
    let counter = 0;
    let sum = 0;
    for (let i = 0; i < friends[k].data[n].length; i++) {
      if (friends[k].data[n][i] > 0) {
        sum += friends[k].data[n][i];
        counter++;
      }
    }

    // If user has not entered data, then the data[] array has just -1 so the box would be black.
    if (sum < 0) {
      return {backgroundColor: "black"};
    }

    sum = sum/counter;

    // Return a background color using pre-determined bounds.
    if (sum > 0.8 && sum <= 1) {
      return {backgroundColor: "blue"};
    }
    else if (sum > 0.6 && sum <= 0.8) {
      return {backgroundColor: "#3300CC"};
    }
    else if (sum > 0.4 && sum <= 0.6) {
      return {backgroundColor: "#660099"};
    }
    else if (sum > 0.2 && sum <= 0.4) {
      return {backgroundColor: "#CC0033"};
    }
    else {
      return {backgroundColor: "red"};
    }
  }

  /*
    searchForPage() essentially takes a search input and takes the user to the page which 
    contains a friends' name that aligns CLOSEST to that input, in the friends[] array.
  */
  const searchForPage = (inp) => {
    // Represents the ratio of input string to target string (so how close they are in size)
    let max = 0;
    // ID of the target string
    let maxID = 0;
    // Traverse friends[] array to find closest match for inp
    for (let i = 0; i < friends.length; i++) {
      // Update max and maxID ONLY if the target string includes inp
      if (friends[i].username.includes(inp)) {
        // Set max to be the size ratio between inp and target string, only if current ratio is higher
        max = Math.max(max, inp.length/friends[i].username.length);
        // Set maxID to the current index
        maxID = i;
      }
    }
    /* 
      Since the index should be the ID of the first friend in the list of 5, we set index
      to be maxID - (maxID % 5) where maxID % 5 is the EXTRA bit after the index of the 
      first friend inthe list.
    */ 
    setIndex(maxID-(maxID % 5));
    /*
      Since maxID starts at 0 while currentPage starts at 1, we do maxID + 1.
      Then, divide by 5 since there are 5 friends in EACH page, and then take
      the ceiling to get a whole number for the current page.
    */
    setCurrentPage(Math.ceil((maxID+1)/5));

  }

  return (
    
    // Entire page
    <div className="wholeTable">

      {/* Used to display page number in SMALL screen sizes */}
      <div className="pageText1">
        <br></br>
        <Typography color="white">
          Page {currentPage} of {Math.ceil(friends.length/4)}
        </Typography>
        <br></br>
      </div>

      {/* Container for table */}
      <div className="myTable">

        {/* Content of table */}
        <table class="table table-dark table-bordered">

          {/* Table header, where there is a column for each day with the 3-letter day abbreviation */}
          <thead>
            {/* Row containing table header content */}
            <tr>
              <th scope="col"><p>Username</p></th>
              <th scope="col">{getDay((day) % 7)}</th>
              <th scope="col">{getDay((day+1) % 7)}</th>
              <th scope="col">{getDay((day+2) % 7)}</th>
              <th scope="col">{getDay((day+3) % 7)}</th>
              <th scope="col">{getDay((day+4) % 7)}</th>
              <th scope="col">{getDay((day+5) % 7)}</th>
              <th scope="col">{getDay((day+6) % 7)}</th>
            </tr>
          </thead>

          {/* Body of table where each row has the friend's name and the data of when he/she is free */}
          <tbody>
            {/* Row for friend whose ID = index */}
            <tr>
              {/* Displays name of friend and a link to chat with him/her */}
              <td>
                {showFriends(index)}  
              </td>

              {/* Remaining columns have a colored box for each day of the week representing how free the friend is. */}
              <td width="10%" style={showData(index,0)}></td> 
              <td width="10%" style={showData(index,1)}></td>
              <td width="10%" style={showData(index,2)}></td>
              <td width="10%" style={showData(index,3)}></td>
              <td width="10%" style={showData(index,4)}></td>
              <td width="10%" style={showData(index,5)}></td>
              <td width="10%" style={showData(index,6)}></td>
              
            </tr>

            {/* Row for friend whose ID = index+1 */}
            <tr>
              {/* Displays name of friend and a link to chat with him/her */}
              <td  className = "rowHeader">
                {showFriends(index+1)} 
              </td>

              {/* Remaining columns have a colored box for each day of the week representing how free the friend is. */}
              <td style={showData(index+1,0)}></td>
              <td style={showData(index+1,1)}></td>
              <td style={showData(index+1,2)}></td>
              <td style={showData(index+1,3)}></td>
              <td style={showData(index+1,4)}></td>
              <td style={showData(index+1,5)}></td>
              <td style={showData(index+1,6)}></td>
            </tr>

            {/* Row for friend whose ID = index+2 */}
            <tr>
              {/* Displays name of friend and a link to chat with him/her */}
              <td  className = "rowHeader">
                {showFriends(index+2)} 
              </td>

              {/* Remaining columns have a colored box for each day of the week representing how free the friend is. */}
              <td style={showData(index+2,0)}></td>
              <td style={showData(index+2,1)}></td>
              <td style={showData(index+2,2)}></td>
              <td style={showData(index+2,3)}></td>
              <td style={showData(index+2,4)}></td>
              <td style={showData(index+2,5)}></td>
              <td style={showData(index+2,6)}></td>
            </tr>

            {/* Row for friend whose ID = index+3 */}
            <tr>
              {/* Displays name of friend and a link to chat with him/her */}
              <td  className = "rowHeader">
                {showFriends(index+3)} 
              </td>

              {/* Remaining columns have a colored box for each day of the week representing how free the friend is. */}
              <td style={showData(index+3,0)}></td>
              <td style={showData(index+3,1)}></td>
              <td style={showData(index+3,2)}></td>
              <td style={showData(index+3,3)}></td>
              <td style={showData(index+3,4)}></td>
              <td style={showData(index+3,5)}></td>
              <td style={showData(index+3,6)}></td>
            </tr>

            {/* Row for friend whose ID = index+4 */}
            <tr>
              {/* Displays name of friend and a link to chat with him/her */}
              <td  className = "rowHeader">
                {showFriends(index+4)} 
              </td>

              {/* Remaining columns have a colored box for each day of the week representing how free the friend is. */}
              <td style={showData(index+4,0)}></td>
              <td style={showData(index+4,1)}></td>
              <td style={showData(index+4,2)}></td>
              <td style={showData(index+4,3)}></td>
              <td style={showData(index+4,4)}></td>
              <td style={showData(index+4,5)}></td>
              <td style={showData(index+4,6)}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Contains the page indicator, search bar, and buttons */}
      <div className="bottomStuff">

        <br></br>

        {/* Page indicator (total pages is ceil(number of friends/4)) */}
        <Typography className="pageText2" color="white" style={{marginLeft: "10px"}}>
          {currentPage} of {Math.ceil(friends.length/4)}
        </Typography>

        {/* Form containing search bar */}
        <form id="searchFriends" noValid autoComplete="off" >
            {/* Container for search bar and search button */}
            <div class="input-group mb-3" id="friendSearchForm">
                  {/* Search bar, where setSearchInput() is used to set the user's query */}
                  <input id="searchInput" type="text" class="form-control" placeholder="Search!" aria-label="Search" aria-describedby="basic-addon1" onChange={(e) => setSearchInput(e.target.value)}></input>
                  {/* Container for search button (span is used so alignment is horizontal) */}
                  <span class="input-group-text" id="basic-addon1" style={{cursor: "pointer"}} onClick={() => {searchForPage(nowSearch)}}>
                      {/* Search button icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>   
                  </span>
              </div>
        </form>
        
        <br></br>
        
        {/* Container for arrow buttons */}
        <div>
          {/* Left arrow button (function is leftArrowClick()) */}
          <Button className="arrBtn" type="button" id="arrowLeft" onClick={leftArrowClick}>
            {/* Icon for left arrow button */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-caret-left" viewBox="0 0 16 16" className="arrow_btn">
              <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
            </svg>
          </Button>

          {/* Right arrow button (function is rightArrowClick()) */}
          <Button className="arrBtn" type="button" id="arrowRight" onClick={rightArrowClick}>
            {/* Icon for right arrow button */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-caret-right" viewBox="0 0 16 16" className="arrow_btn">
              <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
            </svg>
          </Button>
          <br></br>
        </div>

      </div>

      <br></br>

    </div>
  );
}

export default FriendGrid;