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
  const [nowSearch, setSearchInput] = useState("");

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
  
  //MAKE SURE the array thing works!
  //k--> friend number, n--> day number
  function showData (k,n) {
    if (k >= friends.length) {
      return {backgroundColor: "black"};
    }

    let counter = 0;
    let sum = 0;
    for (let i = 0; i < friends[k].data[n].length; i++) {
      if (friends[k].data[n][i] > 0) {
        sum += friends[k].data[n][i];
        counter++;
      }
      
    }

    if (sum < 0) {
      return {backgroundColor: "black"};
    }

    sum = sum/counter;
    //console.log(sum);

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

  const searchForPage = (inp) => {
    let max = 0;
    let maxId = 0;
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].username.includes(inp)) {
        max = Math.max(max, inp/friends[i].username.length);
        maxId = i;
      }
    }

    setIndex(maxId-(maxId % 5));
    setCurrentPage(Math.ceil((maxId+1)/5));

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
                  id="friendLink"
                  to={"/chat"}
                  state={{allFriends: friends, whichFriend: index}}
                >
                  <p id="nameOfFriend">{showFriends(index)}</p>
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
                  id="friendLink"
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
                  id="friendLink"
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
                  id="friendLink"
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
                  id="friendLink"
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
          
          <Typography className="pageText2" color="white" style={{marginLeft: "10px"}}>
            {currentPage} of {Math.ceil(friends.length/4)}
          </Typography>
          <form id="searchFriends" noValid autoComplete="off" >
              <div class="input-group mb-3" id="friendSearchForm">
                    <input id="searchInput" type="text" class="form-control" placeholder="Search!" aria-label="Search" aria-describedby="basic-addon1" onChange={(e) => setSearchInput(e.target.value)}></input>
                    <span class="input-group-text" id="basic-addon1" style={{cursor: "pointer"}} onClick={() => {searchForPage(nowSearch)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>   
                    </span>
                </div>
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