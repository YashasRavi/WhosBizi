import React from 'react'
import {useState, useEffect} from 'react';
import "./SearchFriendStyle.css";


function SearchFriends() {

  //let usernames = ["Aaran", "Aaren", "Aarez", "Aarman", "Aaron", "Aaron-James", "Aarron", "Aaryan", "Aaryn", "Aayan", "Aazaan", "Abaan", "Abbas", "Abdallah", "Abdalroof", "Abdihakim", "Abdirahman", "Abdisalam", "Abdul", "Abdul-Aziz", "Abdulbasir", "Abdulkadir", "Abdulkarem", "Abdulkhader", "Abdullah", "Abdul-Majeed", "Abdulmalik", "Abdul-Rehman", "Abdur", "Abdurraheem", "Abdur-Rahman", "Abdur-Rehmaan", "Abel", "Abhinav", "Abhisumant", "Abid", "Abir", "Abraham", "Abu", "Abubakar", "Ace", "Adain", "Adam", "Adam-James", "Addison", "Addisson", "Adegbola", "Adegbolahan", "Aden", "Adenn", "Adie", "Adil", "Aditya", "Adnan", "Adrian", "Adrien", "Aedan", "Aedin", "Aedyn", "Aeron", "Afonso", "Ahmad", "Ahmed", "Ahmed-Aziz", "Ahoua", "Ahtasham", "Aiadan", "Aidan", "Aiden", "Aiden-Jack", "Aiden-Vee", "Aidian", "Aidy", "Ailin", "Aiman", "Ainsley", "Ainslie", "Airen", "Airidas", "Airlie", "AJ", "Ajay", "A-Jay", "Ajayraj", "Akan", "Akram", "Al", "Ala", "Alan", "Alanas", "Alasdair", "Alastair", "Alber", "Albert", "Albie", "Aldred", "Alec", "Aled", "Aleem", "Aleksandar", "Aleksander", "Aleksandr", "Aleksandrs", "Alekzander", "Alessandro", "Alessio", "Alex", "Alexander", "Alexei", "Alexx", "Alexzander", "Alf", "Alfee", "Alfie", "Alfred", "Alfy", "Alhaji", "Al-Hassan", "Ali", "Aliekber", "Alieu", "Alihaider", "Alisdair", "Alishan", "Alistair", "Alistar", "Alister", "Aliyaan", "Allan", "Allan-Laiton", "Allen", "Allesandro", "Allister", "Ally", "Alphonse", "Altyiab", "Alum", "Alvern", "Alvin", "Alyas", "Amaan", "Aman", "Amani", "Ambanimoh", "Ameer", "Amgad", "Ami", "Amin", "Amir", "Ammaar", "Ammar", "Ammer", "Amolpreet", "Amos", "Amrinder", "Amrit", "Amro", "Anay", "Andrea", "Andreas", "Andrei", "Andrejs", "Andrew", "Andy", "Anees", "Anesu", "Angel", "Angelo", "Angus", "Anir", "Anis", "Anish", "Anmolpreet", "Annan", "Anndra", "Anselm", "Anthony", "Anthony-John", "Antoine", "Anton", "Antoni", "Antonio", "Antony", "Antonyo", "Anubhav", "Aodhan", "Aon", "Aonghus", "Apisai", "Arafat", "Aran", "Arandeep", "Arann", "Aray", "Arayan", "Archibald", "Archie", "Arda", "Ardal", "Ardeshir", "Areeb", "Areez", "Aref", "Arfin", "Argyle", "Argyll", "Ari", "Aria", "Arian", "Arihant", "Aristomenis", "Aristotelis", "Arjuna", "Arlo", "Armaan", "Arman", "Armen", "Arnab", "Arnav", "Arnold", "Aron", "Aronas", "Arran", "Arrham", "Arron", "Arryn", "Arsalan", "Artem", "Arthur", "Artur", "Arturo", "Arun", "Arunas", "Arved", "Arya", "Aryan", "Aryankhan", "Aryian", "Aryn", "Asa", "Asfhan", "Ash", "Ashlee-jay", "Ashley", "Ashton", "Ashton-Lloyd", "Ashtyn", "Ashwin", "Asif", "Asim", "Aslam", "Asrar", "Ata", "Atal", "Atapattu", "Ateeq", "Athol", "Athon", "Athos-Carlos", "Atli", "Atom", "Attila", "Aulay", "Aun", "Austen", "Austin", "Avani", "Averon", "Avi", "Avinash", "Avraham", "Awais", "Awwal", "Axel", "Ayaan", "Ayan", "Aydan", "Ayden", "Aydin", "Aydon", "Ayman", "Ayomide", "Ayren", "Ayrton", "Aytug", "Ayub", "Ayyub", "Azaan", "Azedine", "Azeem", "Azim", "Aziz", "Azlan", "Azzam", "Azzedine", "Babatunmise", "Babur", "Bader", "Badr", "Badsha", "Bailee", "Bailey", "Bailie", "Bailley", "Baillie", "Baley", "Balian", "Banan", "Barath", "Barkley", "Barney", "Baron", "Barrie", "Barry", "Bartlomiej", "Bartosz", "Basher", "Basile", "Baxter", "Baye", "Bayley", "Beau", "Beinn", "Bekim", "Believe", "Ben", "Bendeguz", "Benedict", "Benjamin", "Benjamyn", "Benji", "Benn", "Bennett", "Benny", "Benoit", "Bentley", "Berkay", "Bernard", "Bertie", "Bevin", "Bezalel", "Bhaaldeen", "Bharath", "Bilal", "Bill", "Billy", "Binod", "Bjorn", "Blaike", "Blaine", "Blair", "Blaire", "Blake", "Blazej", "Blazey", "Blessing", "Blue", "Blyth", "Bo", "Boab", "Bob", "Bobby", "Bobby-Lee", "Bodhan", "Boedyn", "Bogdan", "Bohbi", "Bony", "Bowen", "Bowie", "Boyd", "Bracken", "Brad", "Bradan", "Braden", "Bradley", "Bradlie", "Bradly", "Brady", "Bradyn", "Braeden", "Braiden", "Brajan", "Brandan", "Branden", "Brandon", "Brandonlee", "Brandon-Lee", "Brandyn", "Brannan", "Brayden", "Braydon", "Braydyn", "Breandan", "Brehme", "Brendan", "Brendon", "Brendyn", "Breogan", "Bret", "Brett"];
  let usernames = ["Andy", "Tracexi", "Trac", "Parker", "Sheeri", "Bruzz", "Homie", "Jennifer", "Ravioli", "Donkey", "Zebra", "Brudda", "Sangoijdsfo", "idkwhattosay", "thefiftheenth"]
  let isPublic = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  let usernameRanks = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];  

  let invites = ["dsfds", "oeuwr", "ewyfosd", "erwfvsd", "vxcgr", "ewtg", "ieuw9roijfsdf", "dsfdrew", "wrt34", "rewffds"]

  let friends = []; //NEED to get the contents of this from database
  let invited = []; //NEED to get the contents of this from database
  

  /*
  console.log(usernames.length);
  for (let i = 0; i < 401; i++) {
    usernameRanks.push(-1);
  }
  */

  /*
  let usernames = new Map ([
        ["John", 0],
        ["Steve", 0],
        ["Mandalorian", 0],
        ["NiagaraFalls", 0], 
        ["Abf", 0]
    ]);
    */
  

  /*
  const Usernames = new Map([
    ["Aaran", "Aaren", "Aarez", "Aarman", "Aaron", "Aaron-James", "Aarron", "Aaryan", "Aaryn", "Aayan", "Aazaan", "Abaan", "Abbas", "Abdallah", "Abdalroof", "Abdihakim", "Abdirahman", "Abdisalam", "Abdul", "Abdul-Aziz", "Abdulbasir", "Abdulkadir", "Abdulkarem", "Abdulkhader", "Abdullah", "Abdul-Majeed", "Abdulmalik", "Abdul-Rehman", "Abdur", "Abdurraheem", "Abdur-Rahman", "Abdur-Rehmaan", "Abel", "Abhinav", "Abhisumant", "Abid", "Abir", "Abraham", "Abu", "Abubakar", "Ace", "Adain", "Adam", "Adam-James", "Addison", "Addisson", "Adegbola", "Adegbolahan", "Aden", "Adenn", "Adie", "Adil", "Aditya", "Adnan", "Adrian", "Adrien", "Aedan", "Aedin", "Aedyn", "Aeron", "Afonso", "Ahmad", "Ahmed", "Ahmed-Aziz", "Ahoua", "Ahtasham", "Aiadan", "Aidan", "Aiden", "Aiden-Jack", "Aiden-Vee", "Aidian", "Aidy", "Ailin", "Aiman", "Ainsley", "Ainslie", "Airen", "Airidas", "Airlie", "AJ", "Ajay", "A-Jay", "Ajayraj", "Akan", "Akram", "Al", "Ala", "Alan", "Alanas", "Alasdair", "Alastair", "Alber", "Albert", "Albie", "Aldred", "Alec", "Aled", "Aleem", "Aleksandar", "Aleksander", "Aleksandr", "Aleksandrs", "Alekzander", "Alessandro", "Alessio", "Alex", "Alexander", "Alexei", "Alexx", "Alexzander", "Alf", "Alfee", "Alfie", "Alfred", "Alfy", "Alhaji", "Al-Hassan", "Ali", "Aliekber", "Alieu", "Alihaider", "Alisdair", "Alishan", "Alistair", "Alistar", "Alister", "Aliyaan", "Allan", "Allan-Laiton", "Allen", "Allesandro", "Allister", "Ally", "Alphonse", "Altyiab", "Alum", "Alvern", "Alvin", "Alyas", "Amaan", "Aman", "Amani", "Ambanimoh", "Ameer", "Amgad", "Ami", "Amin", "Amir", "Ammaar", "Ammar", "Ammer", "Amolpreet", "Amos", "Amrinder", "Amrit", "Amro", "Anay", "Andrea", "Andreas", "Andrei", "Andrejs", "Andrew", "Andy", "Anees", "Anesu", "Angel", "Angelo", "Angus", "Anir", "Anis", "Anish", "Anmolpreet", "Annan", "Anndra", "Anselm", "Anthony", "Anthony-John", "Antoine", "Anton", "Antoni", "Antonio", "Antony", "Antonyo", "Anubhav", "Aodhan", "Aon", "Aonghus", "Apisai", "Arafat", "Aran", "Arandeep", "Arann", "Aray", "Arayan", "Archibald", "Archie", "Arda", "Ardal", "Ardeshir", "Areeb", "Areez", "Aref", "Arfin", "Argyle", "Argyll", "Ari", "Aria", "Arian", "Arihant", "Aristomenis", "Aristotelis", "Arjuna", "Arlo", "Armaan", "Arman", "Armen", "Arnab", "Arnav", "Arnold", "Aron", "Aronas", "Arran", "Arrham", "Arron", "Arryn", "Arsalan", "Artem", "Arthur", "Artur", "Arturo", "Arun", "Arunas", "Arved", "Arya", "Aryan", "Aryankhan", "Aryian", "Aryn", "Asa", "Asfhan", "Ash", "Ashlee-jay", "Ashley", "Ashton", "Ashton-Lloyd", "Ashtyn", "Ashwin", "Asif", "Asim", "Aslam", "Asrar", "Ata", "Atal", "Atapattu", "Ateeq", "Athol", "Athon", "Athos-Carlos", "Atli", "Atom", "Attila", "Aulay", "Aun", "Austen", "Austin", "Avani", "Averon", "Avi", "Avinash", "Avraham", "Awais", "Awwal", "Axel", "Ayaan", "Ayan", "Aydan", "Ayden", "Aydin", "Aydon", "Ayman", "Ayomide", "Ayren", "Ayrton", "Aytug", "Ayub", "Ayyub", "Azaan", "Azedine", "Azeem", "Azim", "Aziz", "Azlan", "Azzam", "Azzedine", "Babatunmise", "Babur", "Bader", "Badr", "Badsha", "Bailee", "Bailey", "Bailie", "Bailley", "Baillie", "Baley", "Balian", "Banan", "Barath", "Barkley", "Barney", "Baron", "Barrie", "Barry", "Bartlomiej", "Bartosz", "Basher", "Basile", "Baxter", "Baye", "Bayley", "Beau", "Beinn", "Bekim", "Believe", "Ben", "Bendeguz", "Benedict", "Benjamin", "Benjamyn", "Benji", "Benn", "Bennett", "Benny", "Benoit", "Bentley", "Berkay", "Bernard", "Bertie", "Bevin", "Bezalel", "Bhaaldeen", "Bharath", "Bilal", "Bill", "Billy", "Binod", "Bjorn", "Blaike", "Blaine", "Blair", "Blaire", "Blake", "Blazej", "Blazey", "Blessing", "Blue", "Blyth", "Bo", "Boab", "Bob", "Bobby", "Bobby-Lee", "Bodhan", "Boedyn", "Bogdan", "Bohbi", "Bony", "Bowen", "Bowie", "Boyd", "Bracken", "Brad", "Bradan", "Braden", "Bradley", "Bradlie", "Bradly", "Brady", "Bradyn", "Braeden", "Braiden", "Brajan", "Brandan", "Branden", "Brandon", "Brandonlee", "Brandon-Lee", "Brandyn", "Brannan", "Brayden", "Braydon", "Braydyn", "Breandan", "Brehme", "Brendan", "Brendon", "Brendyn", "Breogan", "Bret", "Brett"];
  ]);
*/
  
 let alreadyIn = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
 let theInds = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

  const [nowAlrIn, setNowAlrIn] = useState(alreadyIn);
  const [nowInds, setNowInds] = useState(theInds);
  const [nowInput, setNowInput] = useState("");
  //const [SearchResults, setSearchResults] = useState([]);

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

        //Can be done more efficiently by starting from the end!
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


    /*
    for (const obj of tempRanks.entries()) {
        let k = getRank(inp, obj[0]);
        //tempRanks.set(obj[0], k);
        //obj[1] = k;
    }

    //tempRanks.sort();
    tempRanks.sort((a, b) => b[1] - a[1]);
    setRankArray(tempRanks);
    */
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
    /*
    console.log("Rank array:")
    console.log(rankArray);
    console.log("Current indices:")
    console.log(nowInds);
    console.log("Current ranks:");
    console.log(nowAlrIn);
    */

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
        /*
        return (
            <div>
                <p>Name: {userArray[num]}</p>
                <p>Rank: {rankArray[num]}</p>
            </div>
        )
        */
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
  
  //runSearch("bruz");


  /*
  const retSearchResults = () => {
    return rankArray.map((num, ind) => {
        
        return (
            <div>
                <p>
                    The String is {num[0]} and the rank is {num[1]}.
                </p>
            </div>
        );
        
    });
  };
  */

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