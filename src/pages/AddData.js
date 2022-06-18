import React from 'react'
import { Container } from '@mui/material'


function AddData() {


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


  return (
    <div style={{backgroundImage: "linear-gradient(45deg, #708090, #2F4F4F)"}}>
        <Container>
            <h2 className="chatTitle">
                Record when you're free!
            </h2>
            <br></br>
            <br></br>
            <table class="table table-dark table-bordered">
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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <br></br>
            <br></br>
        </Container>
    </div>
  )
}

export default AddData