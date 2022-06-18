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


/*
stuff to do:
1. Code up the getDay() and corresponding arrow functionality ... DONE
2. Code up the default chatbox and the chat buttons (JUST do profile page) ... DONE
3. Code up remove button for messages (use the message id)
4. Code up edit feature for messages (popup input field)
5. Code up like and reply feature for messages
6. Code up the popup (for messages {delete} and friends {block and remove})
-- ALL done! -- 

FEW FIXES:
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

 const location = useLocation();
 const {whichFriend, allFriends} = location.state;

 const [tableIndex, setTableIndex] = useState(0);
 const [block, setBlock] = useState(allFriends[whichFriend].block);

 const [ChatOpen, setChatOpen] = useState(false);
 const handleChatOpen = () => setChatOpen(true);
 const handleChatClose = () => setChatOpen(false);

 const [FriendOpen, setFriendOpen] = useState(false);
 const handleFriendOpen = () => setFriendOpen(true);
 const handleFriendClose = () => setFriendOpen(false);
 const [currRemFriend, setRemFriend] = useState(null);
 const [currRemIndex, setRemIndex] = useState(-1);

 const [MsgOpen, setMsgOpen] = useState(false);
 const handleMsgOpen = () => setMsgOpen(true);
 const handleMsgClose = () => setMsgOpen(false);
 const [currRemMsg, setRemMsg] = useState(null);
 const [currRemMsgIndex, setRemMsgIndex] = useState(-1);

 const [EditOpen, setEditOpen] = useState(false);
 const handleEditOpen = () => setEditOpen(true);
 const handleEditClose = () => setEditOpen(false);
 const [currEditMsg, setEditMsg] = useState(null);
 const [currEditIndex, setEditIndex] = useState(-1);

 const [RepOpen, setRepOpen] = useState(false);
 const handleRepOpen = () => setRepOpen(true);
 const handleRepClose = () => setRepOpen(false);
 const [currRepMsg, setRepMsg] = useState(null);
 const [currRepIndex, setRepIndex] = useState(-1);
 
 const [currLikeIndex, setLikeIndex] = useState(-1);

 const returnCurrValue = (x, type) => {
    if (x == null) {
        return null;
    }
    else if (type == "friend") {
        return x.username;
    }
    else if (type == "msg") {
        return x.msg;
    }
};

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

 //console.log(whichFriend);

 //let friendList = ["John", "Henry", "Sam"];
 let anotherCopy = allFriends;
 let whenFree = allFriends[whichFriend].data[tableIndex];
 let Messages = allFriends[whichFriend].messages;

 //console.log(allFriends[whichFriend].MaxId);

 
 const [tempId, setTempId] = useState(allFriends[whichFriend].MaxId+1);
 //let myId = allFriends[whichFriend].maxId;


 /*
 let deepCopyMessages = [];

 for (let i = 0; i < Messages.length; i++) {
     deepCopyMessages[i] = Messages[Messages.length-i-1];
 }
 */

let Today = new Date();

function retDate (date, offset) {
    const tod = date;
    const next = new Date(tod);
    next.setDate(tod.getDate()+offset);
    console.log(next); 
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

const rightClick = () => {
    if (tableIndex < 6) {
        setTableIndex(tableIndex+1);
    }
}

const leftClick = () => {
    if (tableIndex > 0) {
        setTableIndex(tableIndex-1);
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
 
 const [nowMessages, setNowMessages] = useState(Messages);
 const [nowFriends, setNowFriends] = useState(anotherCopy);
 const [newSubMsg, setSubMsg] = useState("");

    const removeFriend = (ind) => {
        /*
        if (User == null) {
            return;
        }
        for (let k = 0; k < anotherCopy.length; k++) {
            if (anotherCopy[k].id == User.id) {
                setNowFriends(anotherCopy.splice(k,1));
                break;
            }
        }
        */
        setNowFriends(anotherCopy.splice(ind,1));
        handleFriendClose();
    }

    const removeMsg = (ind) => {
        /*
        if (message == null) {
            return;
        }
        for (let n = 0; n < Messages.length; n++) {
            if (Messages[n].id == message.id) {
                setNowMessages(Messages.splice(n,1));
                break;
            }
        }
        */
        setNowMessages(Messages.splice(ind,1));
        handleMsgClose();
    }

    const editMsg = (ind) => {
        /*
        if (message == null) {
            return;
        }
        for (let n = 0; n < Messages.length; n++) {
            if (Messages[n].id == message.id) {
                Messages[n].msg = document.querySelector("#editForm").value;
                break;
            }
        }
        */

       //setEditMsg(document.querySelector("#editForm").value);
       let temp = document.querySelector("#editForm").value;
       if (temp.trim() != "") {
            Messages[ind].msg = temp;
            handleEditClose();
       }
    }

    const replyMsg = (ind, bool) => {

        if (bool == true) {
            let k = "";
        
            if (document.querySelector("#repMsg") != null) {
                k = document.querySelector("#repMsg").value;
            }
            
            let replyMessage = {
                id: tempId,
                from: "Me",
                to: allFriends[whichFriend].username,
                msg: k
            }

            if (k.trim() != "") {
                setNowMessages(Messages.splice(ind+1, 0, replyMessage));
                setTempId(tempId+1);
            }
            handleRepClose();
        }
        else {
            if (ind != -1) {
                let replyMessage = {
                    id: tempId,
                    from: "Me",
                    to: allFriends[whichFriend].username,
                    msg: "I like this message!"
                }
    
                setNowMessages(Messages.splice(ind+1, 0, replyMessage));
                setTempId(tempId+1);
            }
        }

    }

    useEffect (() => {
        replyMsg(currLikeIndex, false);
    }, [currLikeIndex])

    /*
    const showConfirmationModal = (inp, type) => {
        if (type == "friend") {
            return (
            );
        }
        else if (type == "chat") {

        }
        else if (type == "msg") {

        }
    }
    */

    const listFriends = () => {
        //console.log(this.state.testNum);
        return anotherCopy.map((user, index) => {
            if (index != whichFriend) {
                return (
                    <div>
                      <div class="card" id="friendCard">
                           <div class="card-body">
                              <h6 class="card-subtitle">{user.firstname} {user.lastname}</h6>
                              <br></br>
                              <Link
                                to={"/chat"}
                                state={{allFriends: allFriends, whichFriend: index}}
                              >
                                  <a class="btn btn-primary btn-sm" style={{border: "1px solid black"}}>Chat with {user.username}</a>
                              </Link>
                              <br></br>
                              <br></br>
                              <button class="btn btn-danger btn-sm" onClick={() => {handleFriendOpen(); setRemFriend(user); setRemIndex(index)}} style={{border: "1px solid black"}}>Remove {user.username}</button>
                          </div>
                      </div> 
                      <br></br>
                  </div>
                );
            }

        });
      };

      //let MessageArray = null;
      const listMessages = () => {
            return Messages.map((mess, index) => {
                //console.log(index);
                if (mess.from == "Me") {
                    return (
                        <div className="textMessage">
                            <div id="messageItself">
                                <h6>{mess.from}</h6>
                                <p>{mess.msg}</p>
                            </div>
                            <div id="Icons">
                                <svg id="LeftIcon" onClick={() => {handleEditOpen(); setEditMsg(mess); setEditIndex(index)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                </svg>
                                <svg onClick={() => {handleMsgOpen(); setRemMsg(mess); setRemMsgIndex(index)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </div>
                        </div>
                    );
                }
                else {
                    return (
                        <div className="textMessage">
                            <div id="messageItself">
                                <h6>{mess.from}</h6>
                                <p>{mess.msg}</p>
                            </div>
                            <div id="Icons">
                                <svg id="LeftIcon" onClick={() => {setLikeIndex(index)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                                <svg onClick={() => {handleRepOpen(); setRepMsg(mess); setRepIndex(index)}} xmlns="http://www.w3.org/2000/svg" style={{cursor: "pointer"}} width="20" height="20" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16">
                                    <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
                                </svg>
                            </div>
                        </div>
                    );
                }

          });
          //return MessageArray;
      };

      const listData = (inp) => {
        if (whenFree[inp] < 0) {
            return {backgroundColor: "black"};
        }
        if (whenFree[inp] > 10) {
            return {backgroundColor: "red"};
        }
        else {
            return {backgroundColor: "green"};
        }
      };

      let newMsg = {
          id: -1,
          from: "Me",
          to: allFriends[whichFriend].username,
          msg: "NULLMESSAGE"
      };

      const msgChangeHandler = (inp) => {
          //myId++;
          newMsg = {
            id: tempId,
            from: "Me",
            to: allFriends[whichFriend].username,
            msg: inp
          }
          
      }


      const handleMsgSubmit = (e) => {
        e.preventDefault();
        setTempId(tempId+1);
        let temp = newMsg.msg;
        if (temp != "NULLMESSAGE" && temp.trim() != "") {
            setNowMessages(Messages.push(newMsg));
            setSubMsg(newMsg);
            //console.log(newMsg.id);
            //updateScroll();

            //document.querySelector("#useThis").scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            //MessageArray[MessageArray.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            //document.querySelector("#lastMsg").scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            document.querySelector("#chatForm").reset();
        }
      }

      useEffect(() => {
        document.querySelector("#useThis").scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }, [newSubMsg])


      const handleBlock = () => {
        if (block == false) {
            allFriends[whichFriend].block = true; 
            setBlock(true);
            document.querySelector("#blockButton").innerHTML = "Unblock";
        }
        if (block == true) {
            allFriends[whichFriend].block = false; 
            setBlock(false);
            document.querySelector("#blockButton").innerHTML = "Block";
            document.querySelector(".myMsg").disabled = false;
        }
        
      }

      const displayBlockAlert = () => {
          if ( block == true) {
              document.querySelector(".myMsg").disabled = true;
              return (
                <div class="alert alert-dark" role="alert">
                    You have blocked this person.
                </div>
              );
          }
          else if (allFriends[whichFriend].blocked == true) {
            document.querySelector(".myMsg").disabled = true;
            return (
                <div class="alert alert-dark" role="alert">
                    This person has blocked you.
                </div>
              );
          }
      }

      /*

      const tempFunction = () => {
        removeFriend(currRemFriend);
      }
      */

      useEffect(() => {
        document.querySelector("#useThis").scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
        updateTableArrows(tableIndex);
        //scrollToMsg(Messages);
        //updateDate(tableIndex);
      }, [tableIndex]);

      /*
      useEffect(() => {
        
      }, );
      */

  return (
    <div style={{backgroundImage: "linear-gradient(45deg, #708090, #2F4F4F)"}}>
            
        <Modal
            open={FriendOpen}
            onClose={handleFriendClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={ModalStyle} id="warningModal">
                <h6>
                    Are you sure you want to remove {returnCurrValue(currRemFriend, "friend")} as a friend? 
                </h6>
                <div id="remFriendModalBtns">
                    <button class="btn btn-danger btn-sm" onClick={() => {removeFriend(currRemIndex)}}>Remove</button>
                    <button class="btn btn-primary btn-sm" id="canButton" onClick={handleFriendClose}>Cancel</button>
                </div>
            </Box>
        </Modal>

        <Modal
            open={ChatOpen}
            onClose={handleChatClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={ModalStyle} id="warningModal">
                <h6>
                    Are you sure you want to remove {returnCurrValue(currRemFriend, "friend")} as a friend? 
                </h6>
                <div id="remFriendModalBtns">
                    <Link
                    to={"/profile"}
                    state={{username: "", password: ""}}
                    >
                        <button class="btn btn-danger btn-sm" onClick={() => {removeFriend(currRemIndex)}}>Remove</button>
                    </Link>
                    <button class="btn btn-primary btn-sm"  id="canButton" onClick={handleChatClose}>Cancel</button>
                </div>
            </Box>
        </Modal>

        <Modal
            open={MsgOpen}
            onClose={handleMsgClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={ModalStyle} id="warningModal">
                <h6>
                    Are you sure you want to remove this message:
                </h6>
                <p>
                    {returnCurrValue(currRemMsg, "msg")}
                </p>
                <div id="remFriendModalBtns">
                    <button class="btn btn-danger btn-sm" onClick={() => {removeMsg(currRemMsgIndex)}}>Remove</button>
                    <button class="btn btn-primary btn-sm"  id="canButton" onClick={handleMsgClose}>Cancel</button>
                </div>
            </Box>
        </Modal>

        <Modal
            open={EditOpen}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={ModalStyle} id="warningModal">
                <h6>
                    Edit the message:
                </h6>
                <div id="ModalFormLayout">
                    <input type="text" id="editForm" defaultValue={returnCurrValue(currEditMsg, "msg")}></input>
                    <button class="btn btn-success btn-sm" id="modalFormBtn" onClick={() => {editMsg(currEditIndex)}}>Save</button>
                    <button class="btn btn-primary btn-sm" id="modalFormBtn" onClick={handleEditClose}>Cancel</button>
                </div>
            </Box>
        </Modal>

        <Modal
            open={RepOpen}
            onClose={handleRepClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={ModalStyle} id="warningModal">
                <h6>
                Reply to {allFriends[whichFriend].username}:
                </h6>
                <p>
                    {returnCurrValue(currRepMsg, "msg")}
                </p>
                <div id="ModalFormLayout">
                    <input type="text" id="repMsg"></input>
                    <button class="btn btn-success btn-sm" id="modalFormBtn" onClick={() => {replyMsg(currRepIndex, true)}}>Send</button>
                    <button class="btn btn-primary btn-sm" id="modalFormBtn" onClick={handleRepClose}>Cancel</button>
                </div>
            </Box>
        </Modal>
        

            <div id="allTheThings">
                <h2 className="chatTitle">
                    Chat with your friends!
                </h2>
                <br></br>
                <br></br>


                <div className="chatStuff">
                    <div class="card" id="friendCards">
                        <div class="card-header text-center">
                            <h5 class="card-title" className="cardTitle">
                                My friends ...
                            </h5>
                        </div>
                        <div class="card-body" style={{overflow: "auto"}}>
                            {listFriends()}
                        </div>
                        <div class="card-footer">
                        <input id="searchForFriend" type="text" name="searchFriend" placeholder="Search!"></input>
                            <a href="#" class="btn btn-primary btn-sm" style={{border: "1px solid black"}}>Add friends +</a>
                        </div>
                    </div>
                    <div className="chatSpace">
                        <div className="chatContent">
                            <div class="card" id="friendChat">
                                <div class="card-header">
                                    <h5 class="card-title"  id = "toChange" className="cardTitle">
                                        Chat with {allFriends[whichFriend].username}:
                                    </h5>
                                    <div id="friendButtons">
                                        <button id="blockButton" onClick={handleBlock} class="btn btn-secondary btn-sm" style={{border: "1px solid black"}}>Block</button>
                                        <button id="removeButton" class="btn btn-danger btn-sm" onClick={() => {handleChatOpen(); setRemFriend(allFriends[whichFriend]); setRemIndex(whichFriend) }} style={{border: "1px solid black"}}>Remove</button>
                                    </div>
                                </div>
                                 <div class="card-body" id="allMessages">
                                    <br></br>
                                    <div class="alert alert-warning" role="alert" style={{border: "2px solid #DEB887"}}>
                                        Start a conversation with {allFriends[whichFriend].username}!
                                    </div>
                                    <br></br>
                                    {listMessages()}
                                    {displayBlockAlert()}
                                    <div id="useThis" style={{backgroundColor:"blue"}}></div>
                                </div>
                                <div class="card-footer" style={{border: "1px solid black", borderTop: "2px solid black"}}>
                                    <form noValid autoComplete="off" id="chatForm" onSubmit = {handleMsgSubmit}>
                                        <input className="myMsg" type="text" name="newMsg" placeholder=" Write a message!" 
                                        onChange = {(e) => msgChangeHandler(e.target.value)}></input>
                                        <button type="submit" class="btn btn-dark">Submit!</button>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div id="friendData">
                            <div class="card" id="friendTable">
                                <div class="card-header">
                                    <h5 class="card-title" id="toChange2" className="cardTitle">
                                        When {allFriends[whichFriend].username} is free: 
                                    </h5>
                                </div>
                                <div class="card-body" style={{overflow: "auto"}}>
                                    <table id="fTable" class="table table-bordered">
                                        <thead style={{textAlign: "center"}}>
                                            {retDate(Today, tableIndex)}
                                        </thead>
                                        <br></br>
                                        <tbody>
                                            <tr>
                                                <td className="time">
                                                    8AM-12PM
                                                </td>
                                                <td style={listData(0)}>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="time">
                                                    12PM-4PM
                                                </td>
                                                <td style={listData(1)}>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="time">
                                                    4PM-8PM
                                                </td>
                                                <td style={listData(2)}>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="time">
                                                    8PM-12AM
                                                </td>
                                                <td style={listData(3)}>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="time">
                                                    12AM-4AM
                                                </td>
                                                <td style={listData(4)}>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="time">
                                                    4AM-8AM
                                                </td>
                                                <td style={listData(5)}>
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="card-footer" id="tableFooter">
                                    <div id="leftRightArrows">
                                         <Button id="leftArrow" onClick={leftClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-caret-left" viewBox="0 0 16 16">
                                                <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                                            </svg>
                                        </Button>
                                        <Button id="rightArrow" onClick={rightClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-caret-right" viewBox="0 0 16 16">
                                                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                            </svg>
                                        </Button>
                                    </div>
                                    <a href="#" class="btn btn-primary btn-sm" style={{border: "1px solid black", marginBottom: "10px"}}>Add when you're free +</a>
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
  )
}

export default Chat