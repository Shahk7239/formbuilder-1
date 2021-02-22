const express = require('express')
const route = new express.Router()
var connection = require('../config/db')
const query = require('../config/query');
var dbName = require("../config/dbName");

// route.get('/getforms',function(req,res){
//   operations.getFormDataP().then(data=>{
//     let arr = [];
//     let i=0;
//     // var data2 = data1.replace("\\","");
//     for (const { Examples } of data) {
//       arr[i] = Examples;
//       i++;
//     }
//     console.log(arr);
//     // for(var i = 0; i < data.length; ++i)
//     //   data[i] = data[i].replace(/(?:\r\n|\r|\n)/g, ' ');
//     // console.log(data);
//     res.send(arr)
//   })
// });

// route.post('/putforms',function(req,res){
//   console.log('i am in operations routes')
//   console.log(req.body.stringVal)
//   operations.putFormData(req.body.stringVal).then(data=>{
//     console.log(data);
//     res.send(data)
//   }).catch((err=>{
//     res.send(err)
//   }))
// });


route.post("/postScreen", async (req, res) => {
  //console.log(req.body)
  const {version,orgName,orgID, screenName,screenNo,time,formID,JSON} = req.body;
  const conn = await connection().catch(e => { });
  const result = await query(conn, "INSERT INTO `screen_table` VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  [version, orgName, orgID, screenName, screenNo, time, formID, JSON]).catch((err) => { res.status(400).send(err); })
  res.status(200).json({ Message: 'Got it' });
});


//Mohan
route.get("/getform", async (req,res) => {
  const conn = await connection().catch(e => {});
  const results = await query(conn,'SELECT formJSON FROM form').
  catch((err) => { res.status(400).json(err);})
  res.status(200).send(results);
});

route.post("/postform", async (req,res) =>{
  //console.log(req.body)
  const { id,formJSON } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "INSERT INTO "+dbName+".`form` (id, formJSON) VALUES (?, ?)",
  [id, formJSON]).catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Got it' });
});

route.post("/CreateDB", async (req,res) =>{
  //console.log(req.body)
  const { name } = req.body;
  dbName = name;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "Create Database "+name)
  .catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Created Database' });
});

route.post("/CreateTable", async (req,res) =>{
  //console.log(req.body)
  const { name } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "Create Table "+dbName+"."+name+"(type VARCHAR(100), name VARCHAR(100) NOT NULL, value VARCHAR(250) NOT NULL, PRIMARY KEY (name));")
  .catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Created Table' });
});


route.post("/DropTable", async (req,res) =>{
  //console.log(req.body)
  const { name } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "DROP Table "+dbName+"."+name).
  catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Dropped Table' });
});

route.post("/DropDatabase", async (req,res) =>{
  //console.log(req.body)
  const { name } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "DROP Database "+name).
  catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Dropped Table' });
});


module.exports = route