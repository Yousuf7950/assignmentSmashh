import React,{useState} from 'react';
import Axios from "axios";
import {Form,Button} from 'react-bootstrap';
import './Entry.css';

export default function Entry ()  {  
  const [number,setNumber]=useState("");
  const [date,setDate]=useState("");
  const [value, onChange] = useState(new Date());
  
  const addEntry=()=>{
      Axios.post("http://localhost:3001/createEntry",{
          interchange:'zero',
          number:number,
          date:date,
      })
  }
  const popup=()=>{
    alert("Your Entry Has Been Recorded");
  }
  return (
      <div>
    <Form className='FormStyle'>
      <h3>Enter car entry details</h3>
  <Form.Group className="mb-3">
    <Form.Label>Entry Interchange</Form.Label>
    <Form.Control type="text" placeholder="Interchange" value={'Zero'} required />
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Enter Car Number Plate</Form.Label>
    <Form.Control required type="text" placeholder="LLL-NNN" onChange={(e)=>{setNumber(e.target.value)}} />
  </Form.Group>

  
  <Form.Group className="mb-3">
  <div>Enter date</div>
    <input required type="date" style={{borderColor:'lightGray'}} onChange={(e)=>{setDate(e.target.value)}}/>
  </Form.Group>
  
  
  <Button variant="primary" type="submit" onClick={()=>{addEntry()}}>
    Submit
  </Button>
</Form>
    </div>
  )
}
