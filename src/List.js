import React ,{ useState } from 'react'
import {Button , Form } from 'react-bootstrap';

const List = (props) => {

    const [line , setLine] = useState(false)

    const deleteIt = (line) =>{
       setLine (true);
    }

    return(
        
        <div>
        <li style={{ textDecoration: line ? "line-through": "none"}}> {props.text}</li>
        <span onClick={deleteIt }>X</span>
        </div>
    )
   

}

export default List
