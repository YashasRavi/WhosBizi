import React, {useState, Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import "./CalenderStyle.css";

const Calender = ({array}) => {
    
    let friends = array;

    let today = new Date();
    let Now = today;

    //const [Now, setNow] = useState(today)

    function retDate (date, offset) {
        const tod = date;
        const next = new Date(tod);
        next.setDate(tod.getDate()+offset);
        console.log(next); 
        let current = next.getDay();
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

    function showDensity (p,q) {
        let sum = 0;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].data[p][q] > 0) {
            sum += friends[i].data[p][q];
          }
        }
       
        if (sum > 5) {
          return {backgroundColor: "#DC143C"};
        }
        else {
          return {backgroundColor: "#FFB6C1"};
        }
    }

    return (
      <div>
        {/*<DatePicker selected={Now} onChange={date => {setNow(date); }}></DatePicker>*/}
        <div style={{overflow:"auto", border:"4px solid black", backgroundColor:"white", fontSize:"15px", paddingRight: "15px", paddingLeft: "15px"}}>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col"><p>Time Range</p></th>
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
                    <tr>
                    <th scope="row">8AM-12PM</th>
                    <td style={showDensity(0,0)}></td>
                    <td style={showDensity(1,0)}></td>
                    <td style={showDensity(2,0)}></td>
                    <td style={showDensity(3,0)}></td>
                    <td style={showDensity(4,0)}></td>
                    <td style={showDensity(5,0)}></td>
                    <td style={showDensity(6,0)}></td>
                    </tr>
                    <tr>
                    <th scope="row">12PM-4PM</th>
                    <td style={showDensity(0,1)}></td>
                    <td style={showDensity(1,1)}></td>
                    <td style={showDensity(2,1)}></td>
                    <td style={showDensity(3,1)}></td>
                    <td style={showDensity(4,1)}></td>
                    <td style={showDensity(5,1)}></td>
                    <td style={showDensity(6,1)}></td>
                    </tr>
                    <tr>
                    <th scope="row">4PM-8PM</th>
                    <td style={showDensity(0,2)}></td>
                    <td style={showDensity(1,2)}></td>
                    <td style={showDensity(2,2)}></td>
                    <td style={showDensity(3,2)}></td>
                    <td style={showDensity(4,2)}></td>
                    <td style={showDensity(5,2)}></td>
                    <td style={showDensity(6,2)}></td>
                    </tr>
                    <tr>
                    <th scope="row">8PM-12AM</th>
                    <td style={showDensity(0,3)}></td>
                    <td style={showDensity(1,3)}></td>
                    <td style={showDensity(2,3)}></td>
                    <td style={showDensity(3,3)}></td>
                    <td style={showDensity(4,3)}></td>
                    <td style={showDensity(5,3)}></td>
                    <td style={showDensity(6,3)}></td>
                    </tr>
                    <tr>
                    <th scope="row">12AM-4AM</th>
                    <td style={showDensity(0,4)}></td>
                    <td style={showDensity(1,4)}></td>
                    <td style={showDensity(2,4)}></td>
                    <td style={showDensity(3,4)}></td>
                    <td style={showDensity(4,4)}></td>
                    <td style={showDensity(5,4)}></td>
                    <td style={showDensity(6,4)}></td>
                    </tr>
                    <tr>
                    <th scope="row">4AM-8AM</th>
                    <td style={showDensity(0,5)}></td>
                    <td style={showDensity(1,5)}></td>
                    <td style={showDensity(2,5)}></td>
                    <td style={showDensity(3,5)}></td>
                    <td style={showDensity(4,5)}></td>
                    <td style={showDensity(5,5)}></td>
                    <td style={showDensity(6,5)}></td>
                    </tr>
                </tbody>
            </table>
        </div>
        

        {/* 
        <div style={{display: "flex"}}>
            <div style={{marginRight: "10px"}}>
            <DayPilotNavigator
                selectMode={"week"}
                showMonths={1}
                skipMonths={1}
                onTimeRangeSelected={ args => {
                this.setState({
                    startDate: args.day
                });
                }}
            />
            </div>
            <div style={{display: "flex"}}>
                <DayPilotCalendar
                {...stuff}
                ref={component => {
                    this.calendar = component && component.control;
                }}
                />
            </div>
        </div>
        */}
        
      </div>
    );
}



export default Calender;