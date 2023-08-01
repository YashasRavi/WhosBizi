import React from 'react'
import {useState, useEffect} from 'react';
import "./SearchFriendStyle.css";


function SearchFriends() {
  
  // Dummy usernames used for search algorithm.   
  let usernames = ["Andy", "Trace", "Tron", "Parker", "Sheeri", "Bruce", "Henry", "Jennifer", "Ravi", "Dunkin", "Zebra", "Sepia", "Ken", "Benj", "Ali"]
  
  // Determines if the user with username from the usernames[] array has a public account or not. 
  let isPublic = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  
  // Determine the rank of each username based on how close the username is to the search query.
  let usernameRanks = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];  

  // Usernames of the users who sent invitations to the current users.
  let invites = ["Aaran", "Molly", "Henry", "Dwayne", "Nelli", "Muddy", "Sen", "Cho", "Romvil", "Lucy"]

  // An array containing the usernames of all of the user's friends.
  let friends = []; // NEED to get the contents of this from database

  // An array containing the usernames of all of the users that the user has sent invitations to.
  let invited = []; // NEED to get the contents of this from database  

  // Represents the sorted ranks.
  let alreadyIn = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

  // Represents the index in rankArray[] of every rank in alreadyIn[].
  let theInds = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

  // nowAlrIn represents the sorted ranks, initialized with alreadyIn[].
  const [nowAlrIn, setNowAlrIn] = useState(alreadyIn);

  // nowInds represents the index in rankArray[] of every rank in alreadyIn[], initialized with theInds[].
  const [nowInds, setNowInds] = useState(theInds);

  // Represents the search query, intialized with the empty string "".
  const [nowInput, setNowInput] = useState("");

  // userArray represents the list of dummy usernames used for the search algorithm.
  const [userArray, setUserArray] = useState(usernames);

  // rankArray represents the rank of each username based on the search algorithm. 
  const [rankArray, setRankArray] = useState(usernameRanks);

  // nowInvites contains the usernames of the users who sent invitations to the current users, initialized with invites[].
  const [nowInvites, setNowInvites] = useState(invites);

  // nowFriends contains the usernames of the user's current friends, initialized with friends[].
  const [nowFriends, setNowFriends] = useState(friends);


  /*
    trimName() shortens the username ("str") if it is more than "lim" characters.
  */
  const trimName = (str, lim) => {
    // If the input string is null or empty, don't return anything.
    if (str == null) {
        return;
    }

    // Store the trimmed string in tempName.
    let tempName = "";

    /* 
        If the length of the input string is higher than "lim", trim the input string so it 
        contains only the first "lim" characters and "..." after. Store the output in
        tempName and then return it.
    */
    if (str.length > lim) {
        // "tempName" contains the substring where "lim" is used to cut the string.
        tempName = str.substring(0,lim) + "...";
        // Return the shortened string ("tempName").
        return tempName;
    }

    // Compare if the input string has less than "lim" characters.
    else {
        // If so, just return the string.
        return str;
    }
  }
  
  /*
    getRank() takes the query ("q") and result ("r") and returns a value from 0 to 1
    representing how close the strings are.
  */
  const getRank = (q, r) => {

    // Ensures that the query string is all lowercase to facilitate the comparison.
    let query = q.toString().toLowerCase();

    // Ensures that the result string is all lowercase to facilitate the comparison.
    let result = r.toString().toLowerCase();

    // Check if query and result are the same.
    if (query == result) {
        // If so, return 1.
        return 1;
    }

    // Check if the query is an empty string.
    if (query.length <= 1) {
        // If so, return 0.
        return 0;
    }

    // Check if the query string CONTAINS the result string, with a length ratio of MORE than 0.75. 
    if (query.includes(result) && (result.length/query.length) > 0.75) {
        /*
            If so, return 0.75. 
            Note: This ensures that the length of result is AT LEAST 75% of the length of 
            the query. But since the query contains the result, the length of result is AT 
            MOST 100% of the length of query. 
        */
        return 0.75;
    }

    // Determine the increment to compare reduce the length of the query substring by when comparing.  
    let change = Math.ceil(query.length/5);

    // Start with a rank of 0.
    let tempRank = 0;

    // Have a pointer (i) traversing the query string forwards.
    for (let i = 0; i < query.length-1; i+=change) {
        // Have another pointer (j) traversing the query string backwards.
        for (let j = query.length; j > i; j-=change) {
            // Check if result CONTAINS the substring from index i to j in query.
            if (result.includes(query.substring(i,j))) {
                // Check if result contains all of query (since query.substring(i,j) = query if (j-i) = query.length).
                if ((j-i) == query.length) {
                    // If so, set tempRank to (0.7*(j-i)/result.length)+0.3 IF it is higher than the current tempRank.
                    tempRank = Math.max(tempRank, (0.7*(j-i)/result.length)+0.3);
                }
                // Check if result contains a substring of query (and not all of it).
                else {
                    // If so, set tempRank to (0.7*(j-i)/result.length) IF it is higher than the current tempRank (note that the 0.3 benefit is REMOVED).
                    tempRank = Math.max(tempRank, (j-i)/query.length);
                }
                
            }

        }

    }
    
    // Return the final value of tempRank, meaning the rank of query when comparing to result.
    return tempRank;

  }

  /*
    runSearch() generates the rankArray by comparing the query ("inp") to every username 
    in usernames[], calculating the rank, storing it in a temporary array, and then
    storing that array in rankArray.
  */
  const runSearch = (inp) => {
    // Create a copy of rankArray.
    let tempRanks = [...rankArray];

    // Traverse the usernames[] array.
    for (let i = 0; i < usernames.length; i++) {
        // For every username, calculate the rank when comparing to inp.
        let k = getRank(inp, usernames[i]);
        // Store the rank of username[i] in tempRanks[i].
        tempRanks[i] = k;
    }

    // Set rankArray[] to tempRanks[], changing the state of the page.
    setRankArray(tempRanks);

  }


  /*
    sortRanks() will sort all of the ranks in rankArray[] so that the results are displayed
    in rank order.
    This is basically done by adding the HIGHEST value in rankArray[] in alrIn[0] and for the
    rest of the elements in alrIn[], finding the 1st element in rankArray[] is greater than the previous 
    element that was placed in alrIn[], and placing that element in the current index in alrIn[].
    The indices of the ranks stored in alrIn[] from rankArray[] are also stored in myIndices[].
  */
  const sortRanks = () => {
    
    // alrIn represents the ranks sorted in decreasing order.
    let alrIn = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

    // myIndices represents the index of each rank from alrIn in rankArray.
    let myIndices = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

    // Since we want the top 10 search results, we run the comparison algorithm 10 times. 
    for (let i = 0; i < 10; i++) {

        // For the comparison algorithm, we have to traverse rankArray[].
        for (let j = 0; j < rankArray.length; j++) {

            // For EVERY element in rankArray[], we compare it to the CURRENT element in alrIn[].
            if (rankArray[j] > alrIn[i]) {
                // We handle the case when i > 0, meaning we are considering what to add in the 2nd or higher position in alrIn[].
                if (i > 0) {
                    // We check if there are duplicates AND if the CURRENT element in rankArray[] being analyzed is LOWER/EQUAL than the PREVIOUS element in alrIn[].
                    if (j != myIndices[i-1] && rankArray[j] <= alrIn[i-1]) {
                        // Compare if the CURRENT element in rankArray[] being analyzed is EQUAL than the PREVIOUS element in alrIn[].
                        if (rankArray[j] == alrIn[i-1]) {
                            // Compare if the element in rankArray[] being considered is already in alrIn[] (now done by comparing the indices).
                            if (myIndices.includes(j)) {
                                // If so, disregard the current element and continue to the next element in rankArray[].
                                continue;
                            }
                            // Compare if the element in rankArray[] being considered is NOT in alrIn[] (now done by comparing the indices).
                            else {
                                // If so, set the current position in alrIn[] to the current rank being considered in rankArray[]
                                alrIn[i] = rankArray[j];
                                // Store the index of the rank value being placed in alrIn[] in myIndices[].
                                myIndices[i] = j;
                            }
                        }
                        // Compare if the CURRENT element in rankArray[] being analyzed is LOWER than the PREVIOUS element in alrIn[].
                        else {
                            // Then, we find the appropriate rank in rankArray[] to place in the current positon in alrIn[].
                            alrIn[i] = rankArray[j];
                            // The index of this element in rankArray[] is stored in myIndices[], at the same position (index) as that for alrIn[].
                            myIndices[i] = j;
                        }
                    }
                }
                // We handle the case to determine what to place in the first position in alrIn[].
                else {
                    /* 
                        Because the inner for loop traverses rankArray[], and it is compared to 
                        alrIn[0] in EVERY iteration, we keep updating alrIn[0] until it contains
                        the LARGEST element in rankArray[].
                    */
                    alrIn[i] = rankArray[j];
                    // The index of the largest element in rankArray[] is stored in myIndices[0].
                    myIndices[i] = j;
                }
                
            }
        }
    }

    // Update nowAlrIn to alrIn[] using setNowAlrIn() to change the state of the page.
    setNowAlrIn(alrIn);

    // Update nowInds to myIndices[] using setNowInds() to change the state of the page.
    setNowInds(myIndices);


  }

  /*
    useEffect() is used here to call sortRanks() whenever rankArray[] is modified (meaning
    that the user has entered a query, thus changing rankArray[] which has to now be sorted).
  */
  useEffect (() => {
    sortRanks()
  }, [rankArray])

  /*
    retName() is used to return the text in the buttons associated with the search results,
    where the INDEX of the username in the search result being analyzed is "ind".
  */
  const retName = (ind) => {
    // Check if username with index "ind" has a PRIVATE account by looking at isPublic[ind].
    if (isPublic[ind] == false) {
        // If so, return "Send Invite" since the current user must send an invitation to add this user as a friend.
        return "Send Invite"
    }
    // Check if username with index "ind" has a PUBLIC account by looking at isPublic[ind].
    else {
        // If so, return "Add as Fruend" since the current user DOES NOT need to send an invitation to add this user as a friend.
        return "Add as Friend"
    }
  }

  /*
    retSearchResults() displays the usernames in userArray[] according their ranks, 
    in the order created by sortRanks(). 
    
    The ordered indices of the ranks in rankArray[] are stored in nowInds[], so nowInds[] 
    is used to index into userArray[] to return the appropriate name.
  */
  const retSearchResults = () => {

    // Compare if rankArray[] has not been updated (meaning nothing has been searched yet).
    if (rankArray[0] == -1) {
        // Return a container containing the text "The top 10 results are displayed!" to prompt the user to run a search.
        return (
            // Container for text.
            <div style={{color: "yellow", textAlign: "center"}}>
                {/* Text containing the prompt. */}
                <p>The top 10 results are displayed!</p>
            </div>
        );
    }
    
    // Compare if nowAlrIn[0] = 0, meaning that one of the ranks was 0.
    if (nowAlrIn[0] == 0) {
        // If this is the case, the query was not specific enough (tempRank was not updated in getRank()). 
        return (
            // Container for text informing the user that the query was not specifc enough.
            <div style={{color: "yellow"}}>
                {/* Return the message to the user. */}
                <p>No results found!</p>
                <p>Please make the query more specific.</p>
            </div>
        );
    }
    
    /*
        Traverse nowInds[], where the value at every position is the INDEX of the rank
        in rankArray[], which corresponds to the appropriate INDEX in userArray[]. Since
        "num" is the value being analyzed in nowInds[], then userArray[num] would be the
        corresponding username.
    */
    return nowInds.map((num, ind) => {
       // Make sure that the result being displayed does NOT contain a username that is already in friends[] or invited[].
       if (friends.includes(userArray[num]) || invited.includes(userArray[num])) {
            /*
                Since this is to search for NEW friends, we should not display users that 
                the user has already friended OR sent an invite to. Thus, skip this username.
            */
            return;
       }
       // Perform the following if the result being displayed does not contain a username that is already friended or invited.
       else {
            // Return a card containing the username and a button to send them an invite or add them as a friend.
            return (
                // Card containing the necessary information.
                <div class="card" id="SearchCard">
                    {/* Body of the card. */}
                    <div class="card-body" id="SearchCardBody">
                        {/* Trimmed text containing the username from userArray[]. */}
                        <h6 class="card-subtitle" id="cardSub">{trimName(userArray[num],12)}</h6>
                        {/* 
                            Button to send an invite (if username is from a private account) 
                            or add them as a friend (if username is from a public account) 
                        */}
                        <button class="btn btn-primary btn-sm">{retName(num)}</button>
                    </div>   
                </div>
            );
       }
       
    });
  };

  /*
    retInvites() returns a list of usernames that have sent invitation requests to the user.
  */
  const retInvites = () => {
    // Traverse the nowInvites[] array to return every invitation.
    return nowInvites.map ((inv, ind) => {
        // For every invitation, return a card containing the username and an option to accept or deny the invite.
        return (
            // Card containing necessary information.
            <div class="card" id="InviteCard">
                {/* Card body containing the text and buttons. */}
                <div class="card-body" id="InviteCardBody">
                    {/* Trimmed text containing the username. */}
                    <h6 class="card-subtitle" id="cardSub">
                        {trimName(inv,12)}
                    </h6>
                    {/* Container for the buttons. */}
                    <div>
                        {/* Button to accept an invite, which is done by acceptInvite(). */}
                        <button id="leftBtn" class="btn btn-primary btn-sm" onClick={() => {acceptInvite(ind)}}>Accept</button>
                        {/* Button to deny an invite, which is done by denyInvite(). */}
                        <button class="btn btn-danger btn-sm" onClick={() => {denyInvite(ind)}}>Deny</button>
                    </div>
                </div>
            </div>
        );
    });
  };

  /*
    acceptInvite() takes in a certain index and removes that index from nowInvites[] so that it is no 
    longer displayed in the page. It also adds this user as a friend.
  */
  const acceptInvite = (index) => {

    // Store a copy of the current invitations from nowInvites[] in tempInvites[].
    let tempInvites = [...nowInvites];

    // Add the newly invited friend into the friends[] array.
    friends.push(tempInvites[index]);
    // Update nowFriends[] using friends[] to change the state of the page.
    setNowFriends(friends);

    // UPDATE friends[] to add this user as a friend.

    // Remove the newly invited friend from tempInvites[] so that it is no longer displayed.
    tempInvites.splice(index,1);

    // Update nowInvites[] using tempInvites[] to change the state of the page.
    setNowInvites(tempInvites);

    
    //MORE code to delete from database invites array.

  }

  /*
    acceptInvite() takes in a certain index and removes that index from nowInvites[] so that it is no 
    longer displayed in the page. No need to change the friends[] array.
  */
  const denyInvite = (index) => {

    // Store a copy of the current invitations from nowInvites[] in tempInvites[].
    let tempInvites = [...nowInvites];

    // Remove the newly invited friend from tempInvites[] so that it is no longer displayed.
    tempInvites.splice(index,1);

    // Update nowInvites[] using tempInvites[] to change the state of the page.
    setNowInvites(tempInvites);

    //MORE code to delete from database invites array.
  }

  // Return the entire page.
  return (
    // Container for entire page.
    <div>
        {/* Container for card containing the invitations.*/}
        <div>
            {/* Card containing the invitations. */}
            <div class="card" id="Invites">
                {/* Card header containing the title and directions. */}
                <div class="card-header" style={{margin: "20px"}}>
                    {/* Card title. */}
                    <h5 class="card-subtitle">
                        Invites
                    </h5>
                
                    <br></br>

                    {/* 
                        Card directions to clarify that when the user has a public account,
                        other users will NOT have to send invitations to add him/her as a friend. 
                     */}
                    <p class="card-subtitle">
                        If you want others to directly add you as a friend without sending an invite, make your account public.
                    </p>
                </div>
                
                {/* Card body containing a card for every invitation sent to the user by other users. */}
                <div class="card-body" id="InvitesBody">
                    {retInvites()}
                </div>
            </div>
        </div>

        <br></br>

        <br></br>

        {/* Container for card containing the option to search for new friends. */}
        <div>
            {/* Card containing the option to search for new friends. */}
            <div class="card" id="allResults">
                {/* Card header containing the card title and input field. */}
                <div class="card-header" id="allResultsHeader">
                    {/* Card title. */}
                    <h5 class="card-subtitle">
                        Add New Friends!
                    </h5>

                    <br></br>

                    {/* Form containing the input field and search button. */}
                    <div class="input-group mb-3">
                        {/* Input field which uses setNowInput() to store the user query. */}
                        <input id="friendSearch" type="text" class="form-control" placeholder="Search!" aria-label="Search" aria-describedby="basic-addon1" onChange={(e) => {setNowInput(e.target.value)}}></input>
                        {/* Container for the search button, which uses runSearch() to create the nowAlrIn[] array which has the generated ranks in decreasing order. */}
                        <span class="input-group-text" id="basic-addon1" onClick={() => {runSearch(nowInput)}} style={{cursor: "pointer"}}>
                            {/* Search button icon. */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                {/* Path to extract the search icon. */}
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>   
                        </span>
                    </div>
                </div>
                {/* Card body which contains a card for every search result, where the results are sorted in decreasing rank order. */}
                <div class="card-body" id="allResultsBody">
                    {retSearchResults()}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchFriends