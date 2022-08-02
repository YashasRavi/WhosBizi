import React, {useState, Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import "./CalenderStyle.css";

const Calender = ({array}) => {
    
    let friends = array;

    let today = new Date();
    let Now = today;

    function retDate (date, offset) {
        const tod = date;
        const next = new Date(tod);
        next.setDate(tod.getDate()+offset);
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
          if (friends[i].data[p][q+1] > 0) {
            sum += friends[i].data[p][q+1];
          }
          if (friends[i].data[p][q+2] > 0) {
            sum += friends[i].data[p][q+2];
          }
        }

        sum = sum/(3*friends.length);
       
        if (sum > 0.8 && sum <= 1) {
          return {backgroundColor: "#B30041"};
        }
        else if (sum > 0.6 && sum <= 0.8) {
          return {backgroundColor: "#D7008A"};
        }
        else if (sum > 0.4 && sum <= 0.6) {
          return {backgroundColor: "#ED30CD"};
        }
        else if (sum > 0.2 && sum <= 0.4) {
          return {backgroundColor: "#F55CE7"};
        }
        else {
          return {backgroundColor: "#FA86F2"};
        }

    }

    return (
      <div>
        <div className="calendarTable">
            <table class="table" id="calTable">
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
                    <th scope="row">8AM-11AM</th>
                    <td style={showDensity(0,0)}></td>
                    <td style={showDensity(1,0)}></td>
                    <td style={showDensity(2,0)}></td>
                    <td style={showDensity(3,0)}></td>
                    <td style={showDensity(4,0)}></td>
                    <td style={showDensity(5,0)}></td>
                    <td style={showDensity(6,0)}></td>
                    </tr>
                    <tr>
                    <th scope="row">11AM-2PM</th>
                    <td style={showDensity(0,3)}></td>
                    <td style={showDensity(1,3)}></td>
                    <td style={showDensity(2,3)}></td>
                    <td style={showDensity(3,3)}></td>
                    <td style={showDensity(4,3)}></td>
                    <td style={showDensity(5,3)}></td>
                    <td style={showDensity(6,3)}></td>
                    </tr>
                    <tr>
                    <th scope="row">2PM-5PM</th>
                    <td style={showDensity(0,6)}></td>
                    <td style={showDensity(1,6)}></td>
                    <td style={showDensity(2,6)}></td>
                    <td style={showDensity(3,6)}></td>
                    <td style={showDensity(4,6)}></td>
                    <td style={showDensity(5,6)}></td>
                    <td style={showDensity(6,6)}></td>
                    </tr>
                    <tr>
                    <th scope="row">5PM-8PM</th>
                    <td style={showDensity(0,9)}></td>
                    <td style={showDensity(1,9)}></td>
                    <td style={showDensity(2,9)}></td>
                    <td style={showDensity(3,9)}></td>
                    <td style={showDensity(4,9)}></td>
                    <td style={showDensity(5,9)}></td>
                    <td style={showDensity(6,9)}></td>
                    </tr>
                    <tr>
                    <th scope="row">8PM-11PM</th>
                    <td style={showDensity(0,12)}></td>
                    <td style={showDensity(1,12)}></td>
                    <td style={showDensity(2,12)}></td>
                    <td style={showDensity(3,12)}></td>
                    <td style={showDensity(4,12)}></td>
                    <td style={showDensity(5,12)}></td>
                    <td style={showDensity(6,12)}></td>
                    </tr>
                    <tr>
                    <th scope="row">11PM-2AM</th>
                    <td style={showDensity(0,15)}></td>
                    <td style={showDensity(1,15)}></td>
                    <td style={showDensity(2,15)}></td>
                    <td style={showDensity(3,15)}></td>
                    <td style={showDensity(4,15)}></td>
                    <td style={showDensity(5,15)}></td>
                    <td style={showDensity(6,15)}></td>
                    </tr>
                    <tr>
                    <th scope="row">2AM-5AM</th>
                    <td style={showDensity(0,18)}></td>
                    <td style={showDensity(1,18)}></td>
                    <td style={showDensity(2,18)}></td>
                    <td style={showDensity(3,18)}></td>
                    <td style={showDensity(4,18)}></td>
                    <td style={showDensity(5,18)}></td>
                    <td style={showDensity(6,18)}></td>
                    </tr>
                    <tr>
                    <th scope="row">5AM-8AM</th>
                    <td style={showDensity(0,21)}></td>
                    <td style={showDensity(1,21)}></td>
                    <td style={showDensity(2,21)}></td>
                    <td style={showDensity(3,21)}></td>
                    <td style={showDensity(4,21)}></td>
                    <td style={showDensity(5,21)}></td>
                    <td style={showDensity(6,21)}></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
      </div>
    );
}



export default Calender;