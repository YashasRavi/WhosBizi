import React from 'react'
import {Button} from '@mui/material';
import {Card} from '@mui/material';
import {Container} from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import "./ChatStyle.css";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../components/Header';
import Footer from '../components/Footer';

/*
    FEW FIXES:
    1. Fix the flex layout for the data card and listfriends card for small screen sizes ... DONE
    1. Code up the search for friend feature.
    2. Code up the view more and view less messages options
    3. Replace "I like this message!" with an image or something
    4. Have replied messages look different (maybe with a replied boolean or something)

    EXTRAS:
    1. Code up option to upload pictures
    2. Code up option for calling
    3. Let user customize Chat page
*/

const Chat = () => {

    /* 
        useLocation hook to direct from UserProfile page to Chat page of selected friend.
        Uses these parameters in the LINK to the chat page:
            * id="friendLink"
            * to={"/chat"}
            * state={{allFriends: friends, whichFriend: index}}
        The state contaning whichFriend (ID of selected friend) and allFriends (array of friend objects) 
        is extracted from useLocation.
    */

    const location = useLocation();
    const {whichFriend, allFriends} = location.state;

    // Friend table:

    // tableIndex denotes which day the data table displays (and setTableIndex changes this value)
    const [tableIndex, setTableIndex] = useState(0);

    // Blocking friends:

    // block indicates if the user has blocked the selected friend (the friend with ID = whichFriend)
    const [block, setBlock] = useState(allFriends[whichFriend].block);

    // Removing current friend:

    // ChatOpen indicates if the modal for removing the CURRENT friend is open or not.
    const [ChatOpen, setChatOpen] = useState(false);

    // handleChatOpen() opens the modal for removing the CURRENT friend.
    const handleChatOpen = () => setChatOpen(true);

    // handleChatClose() closes the modal for removing the CURRENT friend.
    const handleChatClose = () => setChatOpen(false);

    // Removing a friend from the list:

    // FriendOpen indicates if the modal to remove a friend from the list is open or not.
    const [FriendOpen, setFriendOpen] = useState(false);

    // handleFriendOpen() opens the modal for removing a friend from the list.
    const handleFriendOpen = () => setFriendOpen(true);

    // handleFriendClose() closes the modal for removing a friend from the list.
    const handleFriendClose = () => setFriendOpen(false);

    // currRemFriend represents the friend to be removed (can be the current friend or any from the list). 
    const [currRemFriend, setRemFriend] = useState(null);

    // currRemIndex represents the index of the friend to be removed (can be the current friend or any from the list). 
    const [currRemIndex, setRemIndex] = useState(-1);

    // Removing a message: 

    // MsgOpen indicates if the modal for removing a message is open or not. 
    const [MsgOpen, setMsgOpen] = useState(false);

    // handleMsgOpen() opens the modal for removing a message. 
    const handleMsgOpen = () => setMsgOpen(true);

    // handleMsgClose() closes the modal for removing a message. 
    const handleMsgClose = () => setMsgOpen(false);

    // currRemMsg represents the message that is to be removed.
    const [currRemMsg, setRemMsg] = useState(null);

    // currRemMsgIndex represents index of the message that is to be removed.
    const [currRemMsgIndex, setRemMsgIndex] = useState(-1);

    // Editing a message:

    // EditOpen indicates if the modal for editing a message is open or not.
    const [EditOpen, setEditOpen] = useState(false);

    // handleEditOpen() opens the modal for editing a message.
    const handleEditOpen = () => setEditOpen(true);

    // handleEditClose() closes the modal for editing a message.
    const handleEditClose = () => setEditOpen(false);

    // currEditMsg represents the message that is TO BE edited.
    const [currEditMsg, setEditMsg] = useState(null);

    // currEditMsgIndex represents the index of the message that is TO BE edited.
    const [currEditIndex, setEditIndex] = useState(-1);

    // Replying to a message:

    // RepOpen indicates if the modal for replying to a message is open or not.
    const [RepOpen, setRepOpen] = useState(false);

    // handleRepOpen() opens the modal for replying to a message.
    const handleRepOpen = () => setRepOpen(true);

    // handleRepOpen() closes the modal for replying to a message.
    const handleRepClose = () => setRepOpen(false);

    // currRepMsg represents the message that is TO BE replied to.
    const [currRepMsg, setRepMsg] = useState(null);

    // currRepMsgIndex represents index of the message that is TO BE replied to.
    const [currRepIndex, setRepIndex] = useState(-1);
    
    // Liking a message:

    // currLikeIndex represents index of the message that is TO BE liked (basically a reply saying "I like this message!").
    const [currLikeIndex, setLikeIndex] = useState(-1);

    /*
        returnCurrValue() uses a user OR message object (x) as an input and returns the 
        username (if x is a user) or the message string (if x is a message). 
    */
    const returnCurrValue = (x, type) => {
        // If x is not a user or message but a null (empty) object, return null.
        if (x == null) {
            return null;
        }

        // If x is a user, return his/her username.
        else if (type == "friend") {
            return x.username;
        }

        // If x is a message object, return the message content.
        else if (type == "msg") {
            return x.msg;
        }
    };

    /*
      Styling for the modals, where absolute positioning is used to place the modal in 
      the CENTER of the page.  
    */
    const ModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'pink',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // Store today's date in the variable "Today".
    let Today = new Date();

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

    /*
        rightClick() increases the page of the table (meaning the tableIndex) by 1
        if the right arrow clicked, IF 0 <= tableIndex < 6.
    */
    const rightClick = () => {
        // Compare if tableIndex < 6, since there are 7 day in the week so only 7 possible values of tableIndex, from 0 to 6.
        if (tableIndex < 6) {
            // If that holds, increase tableIndex by 1.
            setTableIndex(tableIndex+1);
        }
    }

    /*
        leftClick() decreases the page of the table (meaning the tableIndex) by 1
        if the right arrow clicked, IF 0 < tableIndex <= 6.
    */
    const leftClick = () => {
        // Compare if tableIndex > 0, since there are 7 day in the week so only 7 possible values of tableIndex, from 0 to 6.
        if (tableIndex > 0) {
            // If that holds, decrement tableIndex by 1.
            setTableIndex(tableIndex-1);
        }
    }

    /* 
        updateArrows() uses the parameter tI (meaning the tableIndex) to determine whether 
        the left or right arrow should be usable. Left only unusable if first page (tI = 0) and right
        only unusable if last page (tI = 6).
    */
    const updateTableArrows = (tI) => {
        
        // If tI = 6, then the user is on the last page and can't go to the next page, so right arrow is disabled.
        if (tI == 6) {
            document.querySelector("#rightArrow").style.opacity="50%";
        }
        else {
            document.querySelector("#rightArrow").style.opacity="100%";
        }

        // If tI = 0, then the user is on the first page and can't go to the previous page, so left arrow is disabled.
        if (tI == 0) {
            document.querySelector("#leftArrow").style.opacity="50%";
        }
        else {
            document.querySelector("#leftArrow").style.opacity="100%";
        }

    } 

    /*
        useEffect() here used to update the table arrows WHENEVER tableIndex changes,
        meaning that leftClick() or rightClick() was called to change the tableIndex.
    */
    useEffect(() => {
        updateTableArrows(tableIndex);
      }, [tableIndex]);

    /*
        trimName() shortens the username (str) if it is more than "lim" characters.
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
            tempName = str.substring(0,lim) + "...";
            return tempName;
        }

        // If the input string has less than "lim" characters, just return the string.
        else {
            return str;
        }

    }
    
    // anotherCopy stores a copy of allFriends (which is an array of the user's friend objects)
    let anotherCopy = allFriends;

    // whenFree stores the array containing the hourly data of when the user is free on the day represented by tableIndex.
    let whenFree = allFriends[whichFriend].data[tableIndex];

    // Messages contains an array of the user's message objects.
    let Messages = allFriends[whichFriend].messages; 

    // tempId is used to store the ID for any new message that will be submitted (INCLUDING replies).
    const [tempId, setTempId] = useState(allFriends[whichFriend].MaxId+1);

    // nowMessages is an array of the user's messages. The initial value is equal to Messages.
    const [nowMessages, setNowMessages] = useState(Messages);

    // nowFriends is an array of the user's messages. The initial value is equal to anotherCopy (which is allFriends).
    const [nowFriends, setNowFriends] = useState(anotherCopy);

    // newSubMsg is the new message that the user will submit to the friend IN the chatbox.
    const [newSubMsg, setSubMsg] = useState("");

    /*
        Note:
        The indices of the messages are based on how they appear IN THE CHATBOX.
        
        The IDs of the messages are based on how recently they are added. 
        
        So replies will have have a higher ID than a message at the end of the chatbox
        (meaning the end of the Messages[] array).

        For adding a new message, the current ID of the new message is MaxId+1, where
        MaxId is the maximum ID. 

        The maximum ID is NOT NECESSARILY equal to the ID of the final entry in Messages[]
        since replies can have a higher ID than the final entry but be in the middle of 
        Messages[].

    */

    /*
        removeFriend() deletes the friend with id equal to ind, and closes the modal to
        remove a friend.
    */
    const removeFriend = (ind) => {
        /*
            Since the indices of the anotherCopy array correspond to the ID of each friend in 
            anotherCopy, then deleting the element with ID = ind deletes the friend with that ID
            in anotherCopy. The edited version anotherCopy is stored as nowFriends using setNowFriends().
        */
        setNowFriends(anotherCopy.splice(ind,1));

        // Closes the modal that allows the user to remove a friend.
        handleFriendClose();

    }

    /*
        removeMsg() deletes the message with index equal to ind, and closes the modal to
        remove a message.
    */
    const removeMsg = (ind) => {
        /*
            The message with index equal to ind is deleted from Messages[], which contains
            the messages between the user and the selected friend. The edited verison
            of Messages is stored in nowMessages using setNowMessages().
        */
        setNowMessages(Messages.splice(ind,1));

        // Closes the modal that allows the user to remove a message.
        handleMsgClose();

    }

    /*
        editMsg() allows the user to edit the message with index equal to ind in Messages[].
        Then, the modal to edit a message is closed.
    */
    const editMsg = (ind) => {
       // Here, temp stores the input in the text field containing the edited message.
       let temp = document.querySelector("#editForm").value;

       // Compare if the edited message is nonempty contains alphanumeric characters/punctuation.
       if (temp.trim() != "") {
            // Set the old message to the new message, now stored in temp.
            Messages[ind].msg = temp;
            // Close the modal containing the message editing functionality.
            handleEditClose();
       }
       // Alert the user to enter a valid edited message if the input is empty (OR just spaces).
       else {
            // Alert box informing the user to enter a valid message.
            alert("Please enter a valid edited message!");
       }

    }

    /*
        replyMsg() takes in a boolean (bool), which if true, allows the user to reply to 
        the message with index equal to ind in Messages[]. If bool is false, the chatbox
        automatically inserts a "I like this message!" reply on a liked message.
    */
    const replyMsg = (ind, bool) => {
        // When bool is true, then the user is giving a custom reply (and not just liking) to a message with index equal to ind.
        if (bool == true) {

            // Here, k stores the input in the text field containing the reply.
            let k = document.querySelector("#repMsg").value;

            /* 
                replyMessage is a message object that stores the message content (k) and
                and an ID equal to tempId (note that tempId is updated later so any new
                message will have an incremented ID).
            */ 
            let replyMessage = {
                id: tempId,
                from: "Me",
                to: allFriends[whichFriend].username,
                msg: k
            }

            // Compare if k is empty or just spaces.
            if (k.trim() != "") {

                /* 
                    If k is valid, INSERT the reply to index ind+1 in messages. 
                    Note that the 0 parameter means to NOT delete any message, and the replyMessage
                    parameter means to add that message to index ind+1.
                */
                setNowMessages(Messages.splice(ind+1, 0, replyMessage));

                /* 
                    Increment the tempId so the message submitted next (a reply OR any general message) 
                    will have the next available ID (which is tempId + 1).
                */
                setTempId(tempId + 1);

                // Close the modal that gives the user replying functionality.
                handleRepClose();
            }

            // If k is empty or just spaces, alert the user to enter a valid reply.
            else {
                // Alert box informing the user to enter a valid message.
                alert("Please enter a valid reply!");
            }
        }

        // When bool is false, the user is liking the message with index equal to ind.
        else {
            /*
                Check that ind is not -1. This is done to make sure that user has clicked 
                a message since the default currLikeIndex is -1. Once the user clicks the
                "like" button (the heart icon), the currLikeIndex changes to the index of
                the liked message.
            */
            if (ind != -1) {

                /* 
                    In this case, replyMessage is a message object that stores the string "I like this 
                    message!" and an ID equal to tempId (note that tempId is updated later 
                    so any new message will have an incremented ID).
                */ 
                let replyMessage = {
                    id: tempId,
                    from: "Me",
                    to: allFriends[whichFriend].username,
                    msg: "I like this message!"
                }
                
                /* 
                    INSERT the reply to index ind+1 in messages. 
                    Note that the 0 parameter means to NOT delete any message, and the replyMessage
                    parameter means to add that message to index ind+1.
                */
                setNowMessages(Messages.splice(ind+1, 0, replyMessage));

                /* 
                    Increment the tempId so the message submitted next (a reply OR any general message) 
                    will have the next available ID (which is tempId + 1).
                */
                setTempId(tempId+1);
            }
        }

    }

    /*
        The useEffect() ensures that once the currLikeIndex changes to the index of the 
        message in Messages[] that is liked, call replyMsg() with the index of the liked
        message (currLikeIndex) and the boolean false to LIKE the message (not a custom reply).
    */
    useEffect (() => {
        replyMsg(currLikeIndex, false);
    }, [currLikeIndex])

    // nowInput stores the input in the search field in the friend list.
    const [nowInput, setNowInput] = useState("");

    // nowSearch stores the query from the search field AFTER the search button is clicked.
    const [nowSearch, setNowSearch] = useState("");

    
    /*
        listFriends() returns a card containing the list of friends from the allFriends array.
    */
    const listFriends = () => {

        // tempFree contains the friends that will be listed, after restricting the list using the search query.
        let tempFree = [];

        // Traverse every friend in allFriends. Note that "i" would be the ID of every friend.
        for (let i = 0; i < allFriends.length; i++) {

            /*
                If the ID "i" is NOT equal to the ID of the friend being chatted with, 
                AND the username of the friend with ID = "i" INCLUDES the search query
                (nowSearch), then add this friend with ID = "i" to tempFree[].
            */
            if (i != whichFriend && allFriends[i].username.includes(nowSearch)) {
                // Add the friend with ID = "i" (so allFriends[i]) to tempFree[].
                tempFree.push(allFriends[i]);       
            }

        }
        
        /*
            Note:
            The default case is that there is no search query. This means nowSearch = "" 
            (nowSearch only becomes a nonempty string when the user enters an input in the
            search bar AND clicks the search button). 
            Since the query is an empty string, there is NO restriction on which friends to
            list, so ALL of the friends are listed. 
            In other words, every friends' username contains the default query of "".
        */
        
        // Return every friend in tempFree[].
        return tempFree.map((user, index) => {
            // Return a card for EACH friend in tempFree[].
            return (
                // A div tag containing the entire card (as well as a space beneath it using the <br> tag).
                <div id = "containerForEachFriend">
                    {/* The card with the friend's information. */}
                    <div class="card" id="friendCard">
                        {/* Body of the card. Note that a card header is not included. */}
                        <div class="card-body" id = "bodyForEachFriend">
                            {/* Name of the friend, with the last name trimmed to fit to page. */}
                            <h6 class="card-subtitle">{user.firstname} {trimName(user.lastname, 15)}</h6>
                            
                            <br></br>

                            {/* 
                                A button to chat with the friend. The window is reloaded so that 
                                when the user goes to that friend's chat page, the content of
                                the page is refreshed (ex: any old search query is eliminated).
                                
                                This is necessary since going from "/chat" to "/chat" preserves
                                some of the state, EVEN IF the destination "/chat" is for a
                                seperate friend and has different data. 
                            */}
                            <Link
                                to={"/chat"}
                                onClick={() => window.location.reload()}
                                state={{allFriends: allFriends, whichFriend: user.id}}
                            >
                                <a id="chatWithFriendBtn" class="btn btn-primary btn-sm" style={{border: "1px solid black"}}>Chat with {trimName(user.username, 7)}</a>
                            </Link>


                            <br></br>
                            <br></br>

                            {/* A button to remove the friend. */}
                            <button id="remFriendBtn" class="btn btn-danger btn-sm" onClick={() => {handleFriendOpen(); setRemFriend(user); setRemIndex(user.id)}} style={{border: "1px solid black"}}>Remove {trimName(user.username, 7)}</button>
                        
                        </div>

                    </div> 

                    <br></br>

                </div>
            );
        });

      };

      /*
        listMessages() lists all of the messages from Messages[] in the chatbox.
      */
      const listMessages = () => {

        // Return every message in Messages[].
        return Messages.map((mess, index) => {

            // Check if the message is from the user. 
            if (mess.from == "Me") {

                // If the message is from the user, return the following div tag.
                return (

                    // Contains the message and the options to edit and remove this message.
                    <div className="textMessage">

                        {/* Contains the writer of the message (the user) and the message itself */}
                        <div id="messageItself">

                            {/* First name of sender ("Me") */}
                            <h6>{trimName(mess.from, 20)}</h6>

                            {/* Message content */}
                            <p>{mess.msg}</p>

                        </div>

                        {/* Contains the edit message and remove message icons */}
                        <div id="Icons">

                            {/* Edit message icon */}
                            <svg id="LeftIcon" onClick={() => {handleEditOpen(); setEditMsg(mess); setEditIndex(index)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                            </svg>

                            {/* Remove message icon */}
                            <svg onClick={() => {handleMsgOpen(); setRemMsg(mess); setRemMsgIndex(index)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>

                        </div>
                    </div>
                );
            }

            // Check if the message is from the friend. 
            else {

                // If the message is from the friend, return the following div tag.
                return (

                    // Contains the message and the options to like and reply to this message.
                    <div className="textMessage">

                        {/* Contains the writer of the message (the friend) and the message itself */}
                        <div id="messageItself">

                            {/* First name of sender (the friend) */}
                            <h6>{trimName(mess.from, 20)}</h6>

                            {/* Content of message */}
                            <p>{mess.msg}</p>

                        </div>

                        {/* Contains the like message and reply to message icons */}
                        <div id="Icons">

                            {/* Like message icon (a heart) */}
                            <svg id="LeftIcon" onClick={() => {if (block == false) {setLikeIndex(index)}}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>

                            {/* Reply to message icon */}
                            <svg onClick={() => {if (block == false) {handleRepOpen(); setRepMsg(mess); setRepIndex(index)}}} xmlns="http://www.w3.org/2000/svg" style={{cursor: "pointer"}} width="20" height="20" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16">
                                <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
                            </svg>

                        </div>

                    </div>

                );
            }

        });

      };

      /*
        listData() takes in an input number (inp) representing every hour in the 24 hours. 
        This data is contained in whenFree[], which is basically data[tableIndex].
        Note that whenFree[] changes every time tableIndex changes, which would cause 
        listData() to be called again with the new whenFree[] from the updated tableIndex.
      */
      const listData = (inp) => {
        /*
            Using inp (the hour of the day of the week represented by tableIndex),
            return a corresponding background color. The bounds to determine the 
            background color are chosen arbitrarily.
        */
        if (inp < 0) {
            return {backgroundColor: "black"};
        }
        if (inp > 0.8 && inp <= 1) {
            return {backgroundColor: "blue"};
        }
        else if (inp > 0.6 && inp <= 0.8) {
            return {backgroundColor: "#3300CC"};
        }
        else if (inp > 0.4 && inp <= 0.6) {
            return {backgroundColor: "#660099"};
        }
        else if (inp > 0.2 && inp <= 0.4) {
            return {backgroundColor: "#CC0033"};
        }
        else {
            return {backgroundColor: "red"};
        }
        
      };

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
      
      /*
        listAllData() uses the whenFree[] array to return a row for every entry 
        in whenFree[] and a corresponding time and background color for that entry.
      */
      const listAllData = () => {

        // Map every element (hour) in whenFree[]. Here, timeData is the entry at whenFree[index].
        return whenFree.map((timeData, index) => {

            // Return a row in a data table.
            return (

                // Row of the data table.
                <tr id="dataTableRow">

                    {/* The time corresponding to the index. Starts at 8 AM, hence the index+8 input. */}
                    <td className="time">
                        {retTime(index + 8)}
                    </td>

                    {/* Return a background color in an adjacent cell corresponding to the output of retTime(). */}
                    <td style={listData(timeData)}>
                        
                    </td>

                </tr>

            );

        });  

      };

      // Default message to be sent to the friend until the user changes this by writing a new message.
      let newMsg = {
          id: -1,
          from: "Me",
          to: allFriends[whichFriend].username,
          msg: "NULLMESSAGE"
      };

      /*
        msgChangeHandler() uses the input string (inp) in the message entry text box and 
        reassigns newMsg to have the message content as inp and the ID as tempId. Note 
        that tempId is already incremented when the message (or reply) is submitted
        so the new message already has the next available tempId.
      */
      const msgChangeHandler = (inp) => {

          /*
            New message with ID = tempId, where allFriends[whichFriend].username represents the 
            name of the friend being chatted with, and the message content is stored in inp.
          */
          newMsg = {
            id: tempId,
            from: "Me",
            to: allFriends[whichFriend].username,
            msg: inp
          }  

      }

      /*
        handleMsgSubmit() uses an input (e) and submits this message in the chatbox and
        adds this message to Messages[].
      */
      const handleMsgSubmit = (e) => {

        // Here, temp stores the message string contained in the newMsg object.
        let temp = newMsg.msg;

        /*
            Make sure that temp is not the default message string ("NULLMESSAGE") 
            and that temp is not just empty spaces.
        */
        if (temp != "NULLMESSAGE" && temp.trim() != "") {

            // Prevents refreshing of page.
            e.preventDefault();

            // Increments tempId
            setTempId(tempId + 1);

            // Add newMsg to Messages[] and set nowMessages to the updated Messages[] to change the state.
            setNowMessages(Messages.push(newMsg));

            // Set the message TO BE SUBMITTED (meaning newSubMsg) to newMsg.
            setSubMsg(newMsg);

            // Reset the text field once the message is submitted.
            document.querySelector("#chatForm").reset();

        }

      }

      // useEffect() used to SMOOTHLY have the chatBox scroll down so the user can view the new submitted message.
      useEffect(() => {
        document.querySelector("#useThis").scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }, [newSubMsg])

      // useEffect() to AUTOMATICALLY scroll to the bottom of the chatbox when the user OPENS the chat page.
      useEffect(() => {
        document.querySelector("#useThis").scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
      }, [])

      
      /*
        handleBlock() used to block or unblock the friend WHEN the user clicks the 
        "Block" or "Unblock" button. Also disables the user from submitting a new message 
        if the user has blocked this friend.
      */
      const handleBlock = () => {

        // Check if the user has NOT blocked this friend.
        if (block == false) {

            // Once the "Block" button is clicked, set the block parameter for this friend to true.
            allFriends[whichFriend].block = true; 

            // Set block to true.
            setBlock(true);

            // Change the text of the block button to "Unblock" if the user wants to unblock this BLOCKED friend.
            document.querySelector("#blockButton").innerHTML = "Unblock";
        }

        // Check if the user HAS blocked this friend.
        if (block == true) {

            // Once the "Inblock" button is clicked, set the block parameter for this friend to false.
            allFriends[whichFriend].block = false; 

            // Set block to false.
            setBlock(false);

            // Change the text of the block button to "Block" if the user wants to block this UNBLOCKED friend.
            document.querySelector("#blockButton").innerHTML = "Block";

            // Re-enable the text field to submit new messages.
            document.querySelector(".myMsg").disabled = false;

        }
        
      }

      /*
        displayBlockAlert() displays an alert if the friend is blocked by the user
        OR if the user has blocked the friend.
        Note that the user blocking the friend takes PRECEDENCE over the friend blocking
        the user.
      */
      const displayBlockAlert = () => {

        // Check if the user has blocked the friend.
        if ( block == true) {

            // If so, disable the text field to send this friend messages.
            document.querySelector(".myMsg").disabled = true;

            // Return an alert informing the user that he/she has blocked this friend.
            return (
                <div class="alert alert-dark" role="alert">
                    You have blocked this person.
                </div>
            );
        }

        // Check if the friend has blocked this user. 
        else if (allFriends[whichFriend].blocked == true) {

            // If so, disable the text field to send this friend messages.
            document.querySelector(".myMsg").disabled = true;

            // Return an alert informing the user that the friend has blocked him/her.
            return (
                <div class="alert alert-dark" role="alert">
                    This person has blocked you.
                </div>
            );

        }

      }

      

  return (
    // Contains the entire page. A gradient background is used.
    <div style={{backgroundImage: "linear-gradient(45deg, #708090, #2F4F4F)"}}>

        {/* Modal for removing a friend from the list. Opens when FriendOpen is true. */}
        <Modal
            open={FriendOpen}
            onClose={handleFriendClose}
            aria-labelledby="modal-modal-title"
        >
            {/* Box containing the contents of this modal. Uses ModalStyle for CSS. */}
            <Box sx={ModalStyle} id="warningModal">
                {/* Warning title to remove the friend from the list (currRemFriend). */}
                <h6>
                    Are you sure you want to remove {returnCurrValue(currRemFriend, "friend")} as a friend? 
                </h6>
                {/* Buttons to confirm or abort removal. */}
                <div id="remFriendModalBtns">
                    {/* Button to confirm removal (friend at index = currRemIndex is removed) */}
                    <button class="btn btn-danger btn-sm" onClick={() => {removeFriend(currRemIndex)}}>Remove</button>
                    {/* Button to cancel removal, which closes the modal. */}
                    <button class="btn btn-primary btn-sm" id="canButton" onClick={handleFriendClose}>Cancel</button>
                </div>
            </Box>
        </Modal>

        {/* Modal for removing the CURRENT friend. Open when ChatOpen is true. */}
        <Modal
            open={ChatOpen}
            onClose={handleChatClose}
            aria-labelledby="modal-modal-title"
        >
            {/* Box containing the contents of this modal. Uses ModalStyle for CSS. */}
            <Box sx={ModalStyle} id="warningModal">
                {/* Warning title to remove the friend in the list (currRemFriend). */}
                <h6>
                    Are you sure you want to remove {returnCurrValue(currRemFriend, "friend")} as a friend? 
                </h6>
                {/* Buttons to confirm or abort removal. */}
                <div id="remFriendModalBtns">
                    {/* 
                        Button to confirm the removal. 
                        Removes the friend in allFriends[] and takes user to Profile page. 
                    */}
                    <Link
                        to={"/profile"}
                        state={{username: "", password: ""}}
                    >
                        <button class="btn btn-danger btn-sm" onClick={() => {removeFriend(currRemIndex)}}>Remove</button>
                    </Link>
                    {/* Button for cancellation of removal which closes the modal. */}
                    <button class="btn btn-primary btn-sm"  id="canButton" onClick={handleChatClose}>Cancel</button>
                </div>
            </Box>
        </Modal>
        
        {/* Modal for removing a message. Open when MsgOpen is true. */}
        <Modal
            open={MsgOpen}
            onClose={handleMsgClose}
            aria-labelledby="modal-modal-title"
        >
            {/* Box containing the contents of this modal. Uses ModalStyle for CSS. */}
            <Box sx={ModalStyle} id="warningModal">
                {/* Warning heading to remove the message. */}
                <h6>
                    Are you sure you want to remove this message:
                </h6>
                {/* Paragraph tag containing the message to be removed (currRemMsg). */}
                <p>
                    {returnCurrValue(currRemMsg, "msg")}
                </p>
                {/* Buttons to confirm or abort the removal. */}
                <div id="remFriendModalBtns">
                    {/* Button to confirm the removal, deleting the message from Messages[]. */}
                    <button class="btn btn-danger btn-sm" onClick={() => {removeMsg(currRemMsgIndex)}}>Remove</button>
                    {/* Button to cancel removal which closes the modal. */}
                    <button class="btn btn-primary btn-sm"  id="canButton" onClick={handleMsgClose}>Cancel</button>
                </div>
            </Box>
        </Modal>

        {/* Modal for editing the message. Open when EditOpen is true. */}
        <Modal
            open={EditOpen}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
        >
            {/* Box containing the contents of this modal. Uses ModalStyle for CSS. */}
            <Box sx={ModalStyle} id="warningModal">
                {/* Warning header to edit the message. */}
                <h6>
                    Edit the message:
                </h6>
                {/* Container for input field as well the confirmation and cancellation buttons. */}
                <div id="ModalFormLayout">
                    {/* Input field where user can enter the edited message. The original message is the placeholder. */}
                    <input type="text" id="editForm" defaultValue={returnCurrValue(currEditMsg, "msg")}></input>
                    {/* Button to confirm the edit, which changes the message at Message[currEditIndex]. */}
                    <button class="btn btn-success btn-sm" id="modalFormBtn" onClick={() => {editMsg(currEditIndex)}}>Save</button>
                    {/* Button to cancel the edit, which closes the modal. */}
                    <button class="btn btn-primary btn-sm" id="modalFormBtn" onClick={handleEditClose}>Cancel</button>
                </div>
            </Box>
        </Modal>
        
        {/* Modal for replying to a message. */}
        <Modal
            open={RepOpen}
            onClose={handleRepClose}
            aria-labelledby="modal-modal-title"
        >
            {/* Box containing the contents of this modal. Uses ModalStyle for CSS. */}
            <Box sx={ModalStyle} id="warningModal">
                {/* Warning header to reply to the message. */}
                <h6>
                    Reply to {allFriends[whichFriend].username}:
                </h6>
                {/* Paragraph tag containing the message to be replied to (currRepMsg). */}
                <p>
                    {returnCurrValue(currRepMsg, "msg")}
                </p>
                {/* Container for input field as well the confirmation and cancellation buttons. */}
                <div id="ModalFormLayout">
                    {/* Input field where user can enter the reply. */}
                    <input type="text" id="repMsg"></input>
                    {/* Button to send the reply, adding the new message at Messages[currRepIndex + 1]. */}
                    <button class="btn btn-success btn-sm" id="modalFormBtn" onClick={() => {replyMsg(currRepIndex, true)}}>Send</button>
                    {/* Button to cancel the reply, which closes the modal. */}
                    <button class="btn btn-primary btn-sm" id="modalFormBtn" onClick={handleRepClose}>Cancel</button>
                </div>
            </Box>
        </Modal>
        
        {/* Container for header that also creates a box shadow and fixes the header in place. */}
        <div style={{position: "fixed", width: "100%", zIndex: "10", boxShadow: "2px 2px 3px 4px"}}>
            {/* Header tag, where type = 4 indicates that none of the links are bolded. */}
            <Header type="4"></Header>
        </div>
        
        {/* Container for friend list, color scheme, chat box, and data table. */}
        <div id="wholeContainer">
            {/* Inner container for all of the content, where the margins make it less wide than the outer container. */}
            <div id="allTheThings">

                {/* Title of chat page. */}
                <h2 className="chatTitle">
                    Chat with your friends!
                </h2>

                <br></br>
                <br></br>

                {/* Card containing color scheme for data table. */}
                <div class="card text-white bg-dark" id="entireGradCard">
                    {/* Body of the card. */}
                    <div class="card-body">             
                        {/* Heading of the card, aligned in the center. */}
                        <h5 style={{color: "yellow", textAlign: "center"}}>
                            Color Scheme:
                        </h5>

                        <br></br>

                        {/* Top label (used for small screen sizes). */}
                        <p id="altLabel2" style={{color: "red", textAlign: "center"}}>Fully Busy/Unavailable</p>
                        {/* Color gradient bar. */}
                        <div id="tableColorGradientX"></div>
                        {/* Bottom label (used for small screen sizes). */}
                        <p id="altLabel2" style={{color: "lightblue", textAlign: "center"}}>Fully Free/Available</p>
                        
                        {/* Container for labels for large screen sizes (below the gradient bar). */}
                        <div id="gradLabels2">
                            {/* Left label. */}
                            <p style={{color: "red"}}>Fully Busy/Unavailable</p>
                            {/* Right label/ */}
                            <p style={{color: "lightblue"}}>Fully Free/Available</p>
                        </div>
                    </div>

                </div>

                <br></br>
                <br></br>

                {/* Container for friend list, chat box, and data table. */}
                <div className="chatStuff">

                    {/* Card containing all of the friend cards. */}
                    <div class="card" id="friendCards">
                        {/* Container for card header. */}
                        <div class="card-header text-center">
                            {/* Title of friend list. */}
                            <h5 class="card-title" className="cardTitle">
                                My friends ...
                            </h5>
                        </div>
                        {/* Card body displaying a card for every friend. */}
                        <div class="card-body" style={{overflow: "auto"}}>
                            {/* Button to show all friends (used to clear search field and eliminate any search parameters). */}
                            <button id="showAllBtn" class="btn btn-success btn-sm" onClick={() => {setNowSearch(""); document.querySelector("#searchForFriend").value = ""}}>Show All Friends</button>
                            {/* Show all of the friends (title, chat, and remove). */}
                            {listFriends()}
                        </div>
                        {/* Card footer containing search field, "Search" button, and "Add Friends" button. */}
                        <div class="card-footer">    
                            {/* Container for search content. */}
                            <div class="input-group input-group-sm mb-3" id="fullSearchField">
                                {/* Input field for searching for a friend. */}
                                <input id="searchForFriend" type="text" class="form-control" placeholder="Search!" aria-label="Search" aria-describedby="basic-addon1" onChange={(e) => setNowInput(e.target.value)}></input>
                                {/* Search button containing an icon. Clears search field and changes nowSearch once clicked. */}
                                <span class="input-group-text" id="basic-addon1" style={{cursor: "pointer"}} onClick={() => {setNowSearch(nowInput); document.querySelector("#searchForFriend").value = ""}}>
                                    {/* Icon for search button. */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>   
                                </span>
                            </div>
                            {/* Button for adding new friends. */}
                            <button class="btn btn-primary btn-sm" style={{border: "1px solid black"}}>Add friends +</button>
                        </div>
                    </div>

                    {/* Container for chatbox and the friend data. */}
                    <div className="chatSpace">
                        {/* Container for chatbox. */}
                        <div className="chatContent">
                            {/* Card containing all of the messages and the form to submit a new message. */}
                            <div class="card" id="friendChat">
                                {/* Header containing the friend's username and options to block or remove the friend. */}
                                <div class="card-header">
                                    {/* Card heading containing the trimmed username of the friend.  */}
                                    <h5 class="card-title"  id = "toChange" className="cardTitle">
                                        Chat with {trimName(allFriends[whichFriend].username, 20)}:
                                    </h5>
                                    {/* Container for "Block" and "Remove" buttons. */}
                                    <div id="friendButtons">
                                        {/* Button for blocking the friend */}
                                        <button id="blockButton" onClick={handleBlock} class="btn btn-secondary btn-sm" style={{border: "1px solid black"}}>Block</button>
                                        {/* Button for removing the friend. */}
                                        <button id="removeButton" class="btn btn-danger btn-sm" onClick={() => {handleChatOpen(); setRemFriend(allFriends[whichFriend]); setRemIndex(allFriends[whichFriend].id) }} style={{border: "1px solid black"}}>Remove</button>
                                    </div>
                                </div>
                                {/* Card body containing a card for every message. */}
                                 <div class="card-body" id="allMessages">
                                    <br></br>
                                    {/* An alert prompting the user to start a conversation with the friend. */}
                                    <div class="alert alert-warning" role="alert" style={{border: "2px solid #DEB887"}}>
                                        Start a conversation with {allFriends[whichFriend].username}!
                                    </div>

                                    <br></br>
                                    {/* Display of all messages. */}
                                    {listMessages()}
                                    {/* Alert to indicate if the user has blocked this friend OR if the user is blocked. */}
                                    {displayBlockAlert()}
                                    {/* 
                                        Dummy element so that the web page scrolls to the bottom of the chatbox when 
                                        the page is opened OR when a new message is submitted. 
                                    */}
                                    <div id="useThis" style={{backgroundColor:"blue"}}></div>
                                </div>
                                {/* Card footer containing the form to submit a new message. */}
                                <div class="card-footer" style={{border: "1px solid black", borderTop: "2px solid black"}}>
                                    {/* Form to submit a new message. */}
                                    <form noValid autoComplete="off" id="chatForm" onSubmit = {handleMsgSubmit}>
                                        {/* Input field for user to enter a new message. */}
                                        <input className="myMsg" type="text" name="newMsg" placeholder=" Write a message!" 
                                        onChange = {(e) => msgChangeHandler(e.target.value)}></input>
                                        {/* Button to submit this message. */}
                                        <button type="submit" class="btn btn-dark">Submit!</button>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        {/* Container for the data table. */}
                        <div id="friendData">
                            {/* Card containing the data table. */}
                            <div class="card" id="friendTable">
                                {/* Card header containing the friend's username. */}
                                <div class="card-header">
                                    {/* Trimmed username of the friend. */}
                                    <h5 class="card-title" id="toChange2" className="cardTitle">
                                        When {trimName(allFriends[whichFriend].username, 20)} is free: 
                                    </h5>
                                </div>
                                {/* Card body containing the actual data table. */}
                                <div class="card-body" style={{overflow: "auto"}}>
                                    {/* Data table with header and cells. */}
                                    <table id="fTable" class="table table-bordered">
                                        {/* Header listing the date (computed from tableIndex) */}
                                        <thead style={{textAlign: "center"}}>
                                            {retDate(Today, tableIndex)}
                                        </thead>

                                        <br></br>

                                        {/* Table body which displays a row for every hour. */}
                                        <tbody>
                                            {listAllData()}   
                                        </tbody>
                                    </table>
                                </div>
                                {/* Card footer containing arrow buttons and options for the user to add his/her data. */}
                                <div class="card-footer" id="tableFooter">
                                    {/* Container for left and right arrows. */}
                                    <div id="leftRightArrows">
                                        {/* Left arrow button contolled by leftClick(). */}
                                         <Button id="leftArrow" onClick={leftClick}>
                                            {/* Icon for left arrow. */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-caret-left" viewBox="0 0 16 16">
                                                <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                                            </svg>
                                        </Button>
                                        {/* Right arrow button controlled by rightClick(). */}
                                        <Button id="rightArrow" onClick={rightClick}>
                                            {/* Icon for right arrow. */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-caret-right" viewBox="0 0 16 16">
                                                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                            </svg>
                                        </Button>
                                    </div>
                                    {/* Button for the user to add his/her data. */}
                                    <button class="btn btn-primary btn-sm" style={{border: "1px solid black", marginBottom: "10px"}}>
                                        {/* Link for the user to go to the "Add Data" page. */}
                                        <Link
                                            style={{textDecoration: "none", color: "white"}}
                                            to={"/addData"}
                                            state={{username: "", password: ""}}
                                        >   
                                            <Typography>
                                                Add when you're free!
                                            </Typography> 
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>

        {/* Footer tag, where type = 4 indicates that none of the links are bolded. */}
        <Footer type="4"></Footer>
    </div>
  )
}

export default Chat