const express = require('express')
const route = new express.Router()
var connection = require('../config/db')
const query = require('../config/query');

route.get('/', function (req, res, next) {
    res.send({ message: 'Welcome to sbu APIs' })
})

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





//Mohan
route.get("/api/getform", async (req,res) => {
  const conn = await connection().catch(e => {});
  const results = await query(conn,'SELECT formJSON FROM form').
  catch((err) => { res.status(400).json(err);})
  res.status(200).send(results);
});

route.post("/api/postform", async (req,res) =>{
  //console.log(req.body)
  const { id,formJSON } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "INSERT INTO `form` (id, formJSON) VALUES (?, ?)",
  [id, formJSON]).catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Got it' });
});

route.post("/api/CreateDB", async (req,res) =>{
  //console.log(req.body)
  const { name } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "Create Database ?",[name])
  .catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Created Database' });
});

route.post("/api/CreateTable", async (req,res) =>{
  //console.log(req.body)
  const { name } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "Create Table ? (id VARCHAR(200), formJSON JSON)",[name])
  .catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Created Table' });
});

route.post("/api/DropTable", async (req,res) =>{
  //console.log(req.body)
  const { name } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "DROP Table ?",[name]).
  catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Dropped Table' });
});

route.post("/api/DropDatabase", async (req,res) =>{
  //console.log(req.body)
  const { name } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "DROP Database ?",[name]).
  catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Dropped Table' });
});


module.exports = route