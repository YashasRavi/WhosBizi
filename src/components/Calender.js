import React, {useState, Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import "./CalenderStyle.css";

const Calender = ({array}) => {
    
  // Array of friend objects passed from UserProfile page as a prop
    let friends = array;

    // today stores today's date.
    let today = new Date();

    // Now stores today's date.
    let Now = today;

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

    /*
      showDensity() basically takes a day (p) and an hour (q) and returns a color that 
      represents how many friends are free in the time range from q to q+2 hours on day p.
      See descriptions inside the function for more details.
    */
    function showDensity (p,q) {

      // Here, sum represents the SUM of HOW free every friend is from hours q to q+2 on day p.
      let sum = 0;

      // Traverse over all of the friends.
      for (let i = 0; i < friends.length; i++) {

        /*
          Since data[][] has 7 arrays (1 for each day) each with 24 elements (1 for each hour),
          p represents the day and q, q+1, q+2 represent the hours. We handle each hour case
          individually where the value is counted ONLY if it is nonnegative (since a negative
          value means missing data). 
        */
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
      
      /*
        Now, sum represents how free ALL of the friends are at hours q to q+2 on day p.
        We then divide by the number of friends AND the length of the range (3 hours)
        to get an average. 
      */
      sum = sum/(3*friends.length);
      
      /*
        Using the average (now stored in sum), conditioanlly return a background color 
        representing the value. Note that the bounds are arbitrarily determined.
      */
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
      // Entire page 
      <div>
        {/* Container for calender */}
        <div className="calendarTable">
          {/* Table representing the calender */}
          <table class="table" id="calTable">
            {/* Header for calender table displaying the dates */}
            <thead>
              {/* Row containing dates for the week. Offset represents # of days from today. */}
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
            {/* Body of table containing cells, where each cell has a color representing how many friends are free. */}
            <tbody>
              {/* Row for the range 8AM-11AM */}
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
              {/* Row for the range 11AM-2PM */}
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
              {/* Row for the range 2PM-5PM */}
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
              {/* Row for the range 5PM-8PM */}
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
              {/* Row for the range 8PM-11PM */}
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
              {/* Row for the range 11PM-2AM */}
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
              {/* Row for the range 2AM-5AM */}
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
              {/* Row for the range 5AM-8AM */}
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