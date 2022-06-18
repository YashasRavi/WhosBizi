import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import "./FriendGridStyle.css";
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
/*
- Setstate for arrows
- Fill in calenders
*/

const FriendGrid = ({array}) => {
  //let friends = [friend1, friend2, friend3, friend4, friend5, friend6];
  let friends = array;
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  function updateArrows (i) {
    if (i+5 >= friends.length) {
      document.querySelector("#arrowRight").style.opacity="50%";
    }
    else {
      document.querySelector("#arrowRight").style.opacity="100%";
    }
    if (i < 5) {
     document.querySelector("#arrowLeft").style.opacity="50%";
    }
    else {
      document.querySelector("#arrowLeft").style.opacity="100%";
    }
    //return <></>;
  }

  function showFriends (inp) {
    //updateArrows(inp);
    if (inp < friends.length) {
      
      let tempName = friends[inp].username;
      if (tempName.length < 26) {
        return <p>{friends[inp].username}</p>
      }
      else {
        let retString = friends[inp].username.substring(0,25) + "...";
        return <p>{retString}</p>
      }
      
      //return <p>{friends[inp].username}</p>
      
    }
    else {
      return <Button variant="contained" size="small">+ Add Friends</Button>
    }
  }
  
  //MAKE SURE the array thing works!
  //k--> friend number, n--> day number
  function showData (k,n) {
    if (k >= friends.length) {
      return {backgroundColor: "black"};
    }

    let sum = 0;
    for (let i = 0; i < friends[k].data[n].length; i++) {
      sum += friends[k].data[n][i];
    }
    if (sum < 0) {
      return {backgroundColor: "black"};
    }

    if (sum > 5) {
      return {backgroundColor: "red"};
    }
    else {
      return {backgroundColor: "blue"};
    }
  }

  //updateArrows();

  function rightArrowClick () {
    if (index+5 < friends.length) {
      setIndex(index+5);
      setCurrentPage(currentPage+1);
    } 
  }

  useEffect(() => {
    updateArrows(index);
  }, [index])

  function leftArrowClick () {
    if (index >= 5) {
      setIndex(index-5);
      setCurrentPage(currentPage-1);
      //updateArrows();
    }
  }

  const date = new Date();
  let day = date.getDay();

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
  return (
    <div className="wholeTable">
      <div className="pageText1">
            <br></br>
            <Typography color="white">
              Page {currentPage} of {Math.ceil(friends.length/4)}
            </Typography>
            <br></br>
        </div>
      <div className="myTable">
        <table class="table table-dark table-bordered">
          <thead>
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
          <tbody>
            <tr>
              <td>
                <Link
                  to={"/chat"}
                  state={{allFriends: friends, whichFriend: index}}
                >
                  {showFriends(index)}
                </Link>
              </td>
              <td width="10%" style={showData(index,0)}></td> 
              <td width="10%" style={showData(index,1)}></td>
              <td width="10%" style={showData(index,2)}></td>
              <td width="10%" style={showData(index,3)}></td>
              <td width="10%" style={showData(index,4)}></td>
              <td width="10%" style={showData(index,5)}></td>
              <td width="10%" style={showData(index,6)}></td>
            </tr>
            <tr>
              <td  className = "rowHeader">
                <Link
                  to={"/chat"}
                  state={{allFriends: friends, whichFriend: index+1}}
                >
                  {showFriends(index+1)}
                </Link>
              </td>
              <td style={showData(index+1,0)}></td>
              <td style={showData(index+1,1)}></td>
              <td style={showData(index+1,2)}></td>
              <td style={showData(index+1,3)}></td>
              <td style={showData(index+1,4)}></td>
              <td style={showData(index+1,5)}></td>
              <td style={showData(index+1,6)}></td>
            </tr>
            <tr>
              <td  className = "rowHeader">
                <Link
                  to={"/chat"}
                  state={{allFriends: friends, whichFriend: index+2}}
                >
                  {showFriends(index+2)}
                </Link>
              </td>
              <td style={showData(index+2,0)}></td>
              <td style={showData(index+2,1)}></td>
              <td style={showData(index+2,2)}></td>
              <td style={showData(index+2,3)}></td>
              <td style={showData(index+2,4)}></td>
              <td style={showData(index+2,5)}></td>
              <td style={showData(index+2,6)}></td>
            </tr>
            <tr>
              <td  className = "rowHeader">
                <Link
                  to={"/chat"}
                  state={{allFriends: friends, whichFriend: index+3}}
                >
                  {showFriends(index+3)}
                </Link>
              </td>
              <td style={showData(index+3,0)}></td>
              <td style={showData(index+3,1)}></td>
              <td style={showData(index+3,2)}></td>
              <td style={showData(index+3,3)}></td>
              <td style={showData(index+3,4)}></td>
              <td style={showData(index+3,5)}></td>
              <td style={showData(index+3,6)}></td>
            </tr>
            <tr>
              <td  className = "rowHeader">
                <Link
                  to={"/chat"}
                  state={{allFriends: friends, whichFriend: index+4}}
                >
                  {showFriends(index+4)}
                </Link>
              </td>
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
      <div className="bottomStuff">
        <br></br>
          
          <Typography className="pageText2" color="white">
            {currentPage} of {Math.ceil(friends.length/4)}
          </Typography>
          <form id="searchFriends" noValid autoComplete="off" style={{position:"relative", left:"15px"}}>
              <TextField variant="standard" placeholder="Search for friends!" size="small" style={{backgroundColor:"white", borderLeft:"10px solid white", borderBottom: "5px solid white", borderTop: "5px solid white", borderRight: "5px solid white"}}>
              </TextField>
          </form>
          <br></br>
          
          <div>
            <Button className="arrBtn" type="button" id="arrowLeft" onClick={leftArrowClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-caret-left" viewBox="0 0 16 16" className="arrow_btn">
                <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
              </svg>
            </Button>
            <Button className="arrBtn" type="button" id="arrowRight" onClick={rightArrowClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-caret-right" viewBox="0 0 16 16" className="arrow_btn">
                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
              </svg>
            </Button>
            <br></br>
          </div>
      </div>
      <br></br>
    </div>
    /*
    <div style={{ backgroundColor: "grey", height: 400, maxWidth: '100%', textAlign:"center" }}>
      <DataGrid
        variant="primary"
        style={{color: "black", fontWeight: "bold"}}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
    */
  );
}

export default FriendGrid;