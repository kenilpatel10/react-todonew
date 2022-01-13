import axios from 'axios';
import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
const Weather = () => {
        const [input, setInput] = useState('')
        const [temp , setTemp] = useState({});



        const dateBuilder = (d) =>{
            let months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            let days = [
                 'Monday',  'Tuesday', 'Wednesday',  'Thursday','Friday' ,'Saturday','Sunday'];

                 let day= days[d.getDay()];
                 let date= d.getDate();
                 let month= months[d.getMonth()];
                 let year= d.getFullYear();

                 return `${day} ${date} ${month} ${year}`
        }
    const WeatherApp = () =>{

    

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=212fc5df7d55f1f0c2688691bf24ce6f`)
            .then((res)=> {
                console.log(res.data)
                setTemp(res.data)
            })
        

    }
    return (
        <div className={(typeof temp.main != "undefined") ? ((temp.main.temp >16) ? 'app-warm' : 'app') : 'app'}>
            <main>
               

           
             <div className=" ">
<Row>
  <div className="form-outline  col-sm-11 ">
  
    <input id="" type="search" value={input}  className="form-control " placeholder='Search'  onChange={(e) => setInput(e.target.value)} />
    </div>
   <div className=" col-sm-1  ">
    <Button type="button" className="btn mb-3 btn-info " onClick={WeatherApp} >
     <BsSearch/>
  </Button>

  </div>
  </Row>
{/* <div  className=" col-sm-6  "> */}
 
  {/* </div> */}
  <div className='date'>{dateBuilder(new Date())}</div>


  
<div className='date'> {temp.name} </div>
      {/* <div className='location'>{(temp || {}).name|| ""}</div> */}
     
  

  {/* <div className='temp-box'> */}
      <div className='temp'>
      {Math.round((temp.main || {}).temp|| "")}&deg;C
     {/* <br/> {(temp.weather[0] || {}).main|| ""} */}

      </div>
  {/* </div> */}
  {/* <p>temp {temp.main.temp }</p> */}
  {/* <p>name {(temp || {}).name|| ""}</p> */}
  {/* <p>WEATHER {(temp.weather[0] || []).main|| ""}</p> */}
  {/* <p>WEATHER {(temp.wind|| {}).speed|| ""}</p> */}


  </div> 

  </main>

        </div>
    )
}

export default Weather
