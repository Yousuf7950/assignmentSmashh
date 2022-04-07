import React , { useState , useEffect }  from 'react'
import Select from "react-dropdown-select";
import axios from 'axios';
import Calculate from './calculation';
import {Form,Button,Container,Row,Col} from 'react-bootstrap';
import './Entry.css';

export default function Exit  ()  {
    const [locname, setLocname] = useState([]);
    const [dataa, setDataa] = useState();
    const [toggle,setToggle] = useState(false);
    const [toggle2,setToggle2] = useState(false);
    const [cardata  ,setCardata] = useState();
    const [active,setActive] = useState(false);
    const [exitDate ,setDate] = useState(new Date())
    const [exitInterchange,setExit] = useState(5)
    const [total,settotal] = useState(0)
    const [cb,setcb] =useState(0)
    const [dis,setdis] =useState(0)
    const [cost,setcost] =useState(0)
    const [carExit, setCarexit] = useState([]);
    var base =20;
    // const p = new Date();
    const isEven=(n)=>{
      return n%2==0;
    };
    const isOdd=(n)=>{
      return Math.abs(n%2)==1;
    };
    
    const calculation =()=>{
      const p = new Date(exitDate)
      var cost = 0.2
      var numberPlate = dataa.split('-')[1]
      var discount = 1;
    
      if(p.getDay()==1 && isEven(numberPlate)){
        discount=0.9
      }
      if(p.getDay()==3 && isEven(numberPlate)){
        discount=0.9
      }
      if(p.getDay()==2 && isOdd(numberPlate)){
        discount=0.9
      }
      if(p.getDay()==4 && isOdd(numberPlate)){
        discount=0.9
      }
      
      if(p.getDay()==6 || p.getDay() == 0){
        cost =  1.5
      }
      if(p.getDate()===23 && p.getMonth()===2){
        discount = .5
      }
      else if(p.getDate()===14 && p.getMonth()===7){
        discount = .5
      }
      else if(p.getDate()===25 && p.getMonth()===11){
        discount = .5
      }
    
      setcb(exitInterchange * cost )
      setdis(discount)
      setcost(cost)
      settotal((base + (exitInterchange * cost )) * discount ) 
    }
      useEffect(() => {
        apicall(); 
      }, []);
      const apicall = async () => {
       const result = await axios("http://localhost:3001/getCar");
        var data  = []

        result.data.map((d) => {
          // console.log("data", d.carnumber)
          data.push(d.carnumber)
          
        });
        setLocname(data)
      }
      const getData = (p)=>{
        axios.post("http://localhost:3001/getData",{number : p}).then(e=>{
            // console.log(e.data[0])
            setCardata(e.data[0])
            setActive(true)
        })
      }
      const refreshPage=()=> {
        window.location.reload(false);
      }
      const updateDetails = (carnumber) => {
        axios.put("http://localhost:3001/update", { exitdate: exitDate, exitInterchange: exitInterchange,carnumber:carnumber }).then(
          (response) => {
            setCarexit(
              carExit.map((val) => {
                return val.carnumber === carnumber
                  ? {
                      carnumber: val.carnumber,
                    exitInterchange: val.exitInterchange,
                      exitDate: val.exitDate,
                    }
                  : val;
              })
            );
          }
        );
      };
      
  return (
<div >
  

  <Container>
    <Row>
      <Col style={{marginTop:'15px'}}>
      <h3>Enter car exit details</h3>
  <div className='FormStyle'>
    <Form.Label> Select Car Number Plate</Form.Label>
<select value={dataa} onChange={(e)=>{getData(e.target.value);setDataa(e.target.value);setToggle(true)}}>
      <option value={''}>Please Select</option>
       {locname.map((e,i)=>{
         return <option key={i} value={e}>{e}</option>
       })} 
     </select>
     <Form >
  <Form.Group className="mb-3" style={{marginTop:'10px'}}>
    <Form.Label>Entry Interchange </Form.Label>
    <Form.Control disabled={true} value={(active)?cardata.entryinterchange:'Select car number first'} /> 
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Entry Date</Form.Label>
    <Form.Control  disabled={true} value={(active)?cardata.entrydate:'Select car number first'} />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Car Number</Form.Label>
    <Form.Control  disabled={true} value={(active)?dataa:'Select car number first'} />
  </Form.Group>
  <Form.Group className="mb-3">
  <div>Enter exit date</div>
    <input type={'date'} style={{borderColor:'lightGray'}} onChange={(e)=>{setDate(e.target.value)}}/>
  </Form.Group>
  <Form.Group className="mb-3" style={{display:'flex',flexDirection:'column'}}>
    
    <Form.Label>Select exit interchange</Form.Label>
    <select  onChange={(e)=>{setExit(e.target.value)}}>
          <option value={5}>NS</option>
          <option value={10}>Ph4</option>
          <option value={17}>Ferozpur</option>
          <option value={24}>Lake City</option>
          <option value={29}>Raiwand</option>
          <option value={34}>Bahria</option>
        </select>
  </Form.Group>

  <Button variant="primary" type="button" onClick={()=>{calculation();updateDetails();base++;setToggle2(!toggle2)}}>
    Submit
  </Button >
  <Button variant="primary" style={{marginLeft:'5px'}} onClick={refreshPage}>
    Make Another Entry
  </Button >
</Form>
{carExit.map((val,key)=>{
   return(
    <Button variant="primary" type="button" onClick={()=>{calculation();updateDetails(val.carnumber);base++;setToggle2(!toggle2)}}>
    Submitada
  </Button >
   )
  })}
</div>
</Col>
<Col style={{marginTop:'15px'}} classname='FormStyle'>
<h3>Toll Total</h3>
<Calculate base={base} exitInterchange={exitInterchange} cost={cost} discount={dis} />
</Col>
</Row>
    </Container>
    </div>
  )
}