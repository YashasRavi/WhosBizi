import React from 'react'
import {useState, useEffect} from 'react';
import "./SearchFriendStyle.css";


function SearchFriends() {

  let usernames = ["Andy", "Trace", "Tron", "Parker", "Sheeri", "Bruce", "Henry", "Jennifer", "Ravi", "Dunkin", "Zebra", "Sepia", "Ken", "Benj", "Ali"]
  let isPublic = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  let usernameRanks = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];  

  let invites = ["Aaran", "Molly", "Henry", "Dwayne", "Nelli", "Muddy", "Sen", "Cho", "Romvil", "Lucy"]

  let friends = []; //NEED to get the contents of this from database
  let invited = []; //NEED to get the contents of this from database  
 let alreadyIn = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
 let theInds = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

  const [nowAlrIn, setNowAlrIn] = useState(alreadyIn);
  const [nowInds, setNowInds] = useState(theInds);
  const [nowInput, setNowInput] = useState("");

  const [userArray, setUserArray] = useState(usernames);
  const [rankArray, setRankArray] = useState(usernameRanks);

  const [nowInvites, setNowInvites] = useState(invites);

  const trimName = (str, lim) => {
    if (str == null) {
        return;
    }
    let tempName = "";
    if (str.length > lim) {
        tempName = str.substring(0,lim) + "...";
        return tempName;
    }
    else {
        return str;
    }
}
  
  const getRank = (q, r) => {
    let query = q.toString().toLowerCase();
    let result = r.toString().toLowerCase();

    if (query == result) {
        return 1;
    }

    if (query.length <= 1) {
        return 0;
    }

    if (query.includes(result) && (result.length/query.length) > 0.75) {
        return 0.75;
    }

    let change = Math.ceil(query.length/5);
    let tempRank = 0;

    for (let i = 0; i < query.length-1; i+=change) {
        for (let j = query.length; j > i; j-=change) {

            if (result.includes(query.substring(i,j))) {
                if ((j-i) == query.length) {
                    tempRank = Math.max(tempRank, (0.7*(j-i)/result.length)+0.3);
                }
                else {
                    tempRank = Math.max(tempRank, (j-i)/query.length);
                }
                
            }

        }

    }
    
    return tempRank;

  }

  const runSearch = (inp) => {
    let tempRanks = [...rankArray];

    for (let i = 0; i < usernames.length; i++) {
        let k = getRank(inp, usernames[i]);
        tempRanks[i] = k;
    }

    setRankArray(tempRanks);

  }


  const sortRanks = () => {
    
    let alrIn = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    let myIndices = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < rankArray.length; j++) {
            if (rankArray[j] > alrIn[i]) {
                if (i > 0) {
                    if (j != myIndices[i-1] && rankArray[j] <= alrIn[i-1]) {
                        if (rankArray[j] == alrIn[i-1]) {
                            if (myIndices.includes(j)) {
                                continue;
                            }
                            else {
                                alrIn[i] = rankArray[j];
                                myIndices[i] = j;
                            }
                        }
                        else {
                            alrIn[i] = rankArray[j];
                            myIndices[i] = j;
                        }
                    }
                }
                else {
                    alrIn[i] = rankArray[j];
                    myIndices[i] = j;
                }
                
            }
        }
    }

    setNowAlrIn(alrIn);
    setNowInds(myIndices);


  }

  useEffect (() => {
    console.log(rankArray);
    sortRanks()
  }, [rankArray])

  
  const retName = (ind) => {
    if (isPublic[ind] == false) {
        return "Send Invite"
    }
    else {
        return "Add as Friend"
    }
  }

  const retSearchResults = () => {

    if (rankArray[0] == -1) {
        return (
            <div style={{color: "yellow", textAlign: "center"}}>
                <p>The top 10 results are displayed!</p>
            </div>
        );
    }
    
    if (nowAlrIn[0] == 0) {
        return (
            <div style={{color: "yellow"}}>
                <p>No results found!</p>
                <p>Please make the query more specific.</p>
            </div>
        );
    }
    
    return nowInds.map((num, ind) => {

       if (friends.includes(userArray[num]) || invited.includes(userArray[num])) {
            return;
       }
       else {
            return (
                <div class="card" id="SearchCard">
                    <div class="card-body" id="SearchCardBody">
                        <h6 class="card-subtitle" id="cardSub">{trimName(userArray[num],12)}</h6>
                        <button class="btn btn-primary btn-sm">{retName(num)}</button>
                    </div>   
                </div>
            );
       }
       
    });
  };

  const retInvites = () => {
    return nowInvites.map ((inv, ind) => {
        return (
            <div class="card" id="InviteCard">
                <div class="card-body" id="InviteCardBody">
                    <h6 class="card-subtitle" id="cardSub">
                        {trimName(inv,12)}
                    </h6>
                    <div>
                        <button id="leftBtn" class="btn btn-primary btn-sm" onClick={() => {acceptInvite(ind)}}>Accept</button>
                        <button class="btn btn-danger btn-sm" onClick={() => {denyInvite(ind)}}>Deny</button>
                    </div>
                </div>
            </div>
        );
    });
  };

  const acceptInvite = (index) => {
    let tempInvites = [...nowInvites];

    tempInvites.splice(index,1);

    setNowInvites(tempInvites);

    //MORE code to delete from database invites array
  }

  const denyInvite = (index) => {

    let tempInvites = [...nowInvites];

    tempInvites.splice(index,1);

    setNowInvites(tempInvites);

    //MORE code to delete from database invites array
  }


  return (
    <div>
        <div>
            <div class="card" id="Invites">

                <div class="card-header" style={{margin: "20px"}}>
                    <h5 class="card-subtitle">
                        Invites
                    </h5>
                    <br></br>
                    <p class="card-subtitle">
                        If you want others to directly add you as a friend without sending an invite, make your account public.
                    </p>
                </div>
               
                <div class="card-body" id="InvitesBody">
                    {retInvites()}
                </div>
            </div>
        </div>

        <br></br>
        <br></br>

        <div>
            <div class="card" id="allResults">
                <div class="card-header" id="allResultsHeader">
                    <h5 class="card-subtitle">
                        Add New Friends!
                    </h5>
                    <br></br>
                    <div class="input-group mb-3">
                        <input id="friendSearch" type="text" class="form-control" placeholder="Search!" aria-label="Search" aria-describedby="basic-addon1" onChange={(e) => {setNowInput(e.target.value)}}></input>
                        <span class="input-group-text" id="basic-addon1" onClick={() => {runSearch(nowInput)}} style={{cursor: "pointer"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>   
                        </span>
                    </div>
                </div>
                <div class="card-body" id="allResultsBody">
                    {retSearchResults()}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchFriends