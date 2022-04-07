const express=require("express");
const app=express();
const mysql=require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root",
    database:"smash"
})

app.post("/createEntry",(req,res)=>{
    const interchange=req.body.interchange;
    const number=req.body.number;
    const date=req.body.date;

    db.query(
    "INSERT INTO entry (entryinterchange,entrydate,carnumber) VALUES (?,?,?)",
    [interchange,date,number],
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("inserted entry")
        }
    }
    )
})

app.get("/getCar", (req, res) => {
    db.query("Select identry,carnumber from entry", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.post('/getData',(req,res)=>{
    console.log(req.body)
    const query ="select entryinterchange,entrydate from smash.entry where carnumber=?"
    db.query(query,[req.body.number],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})
app.get('/entryInfo',(req,res)=>{
    db.query("Select entryinterchange,entrydate from entry",(err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})  

app.post("/createExit",(req,res)=>{
    const exitinterchange=req.body.exitinterchange;
    const exitdate=req.body.exitdate;

    db.query(
    "INSERT INTO entry (exitinterchange,exitdate) VALUES (?,?)",
    [exitinterchange,exitdate],
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("inserted entry")
        }
    }
    )
})
app.put("/update", (req, res) => {
    const carnumber = req.body.carnumber;
    const exitinterchange = req.body.exitInterchange;
    const exitdate= req.body.exitDate;

    db.query(
      "UPDATE entry SET exitinterchange=?,exitdate=?  WHERE carnumber=?",
      [exitinterchange, exitdate,carnumber],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });


app.listen(3001,()=>{
    console.log("App is running ; port 3001");
});
