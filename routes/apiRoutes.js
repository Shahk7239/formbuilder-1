const express = require('express')
const route = new express.Router()
var connection = require('../config/db')
const query = require('../config/query');
var dbName = "mohan"


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

// route.post("/createScreen", async (req,res) =>{
//   const conn = await connection().catch(e => {});
//   const result = await query(conn,"CREATE TABLE IF NOT EXISTS "+dbName+".`screen` (`Version` int NOT NULL,`OrgName` varchar(45) NOT NULL,`OrgID` varchar(45) NOT NULL,`ScreenName` varchar(45) NOT NULL,`ScreenID` varchar(45) NOT NULL,`TimeStamp` datetime NOT NULL,PRIMARY KEY (`OrgID`,`ScreenID`))")
//   .catch((err) => {res.status(400).send(err);})
//   res.json({ Message: 'Created Screen table' });
// });

// route.post("/postScreen", async (req, res) => {
//   //console.log(req.body)
//   const {version,orgName,orgID,screenName,screenID} = req.body;
//   const conn = await connection().catch(e => { });
//   const result = await query(conn, "INSERT INTO "+dbName+".`screen` VALUES (?, ?, ?, ?, ?, now())",
//   [version, orgName, orgID, screenName, screenID, new Date()]).catch((err) => { res.status(400).send(err); })
//   res.json({ Message: 'Received Screen Data' });
// });


// route.post("/createMeta", async (req, res) => {
//   const {formName} = req.body;
//   const conn = await connection().catch(e => { });
//   const result = await query(conn, "CREATE TABLE IF NOT EXISTS "+dbName+".`"+formName+"` (`FormVersion` varchar(40) NOT NULL,`FormID` varchar(45) NOT NULL,`FormJSON` JSON NOT NULL,`ScreenID` varchar(45) NOT NULL,PRIMARY KEY (FormID))")
//   .catch((err) => { res.status(400).send(err); })
//   res.json({ Message: 'Created Meta Form table' });
// });

// route.post("/postMeta", async (req, res) => {
//   const {formName,formVersion,formID, formJSON, screenID} = req.body;
//   const conn = await connection().catch(e => { });
//   const result = await query(conn, "INSERT INTO "+dbName+".`"+formName+"` VALUES (?, ?, ?, ?)",
//   [formVersion,formID,formJSON,screenID]).catch((err) => { res.status(400).send(err); })
//   res.json({ Message: 'Received Meta Form Data' });
// });

// route.put("/putMeta", async (req, res) => {
//   const {dbName,formName, formID,formJSON} = req.body;
//   const conn = await connection().catch(e => { });
//   const qu = "UPDATE "+dbName+".`"+formName+"` SET FormJSON = '"+formJSON+"' where FormID='"+formID+"';"
//   //console.log(qu);
//   const result = await query(conn, qu)
//   .catch((err) => { res.status(400).json(err); })
//   res.json({Message:"Updated Meta Form"});
// });

// route.get("/getMeta/:dbName&:form&:screen", async (req, res) => {
//   const {dbName,form,screen} = req.params;
//   const conn = await connection().catch(e => { });
//   const qu="Select FormJSON from "+dbName+".`"+form+"` where ScreenID = \""+screen+"\"";
//   //console.log(qu);
//   const result = await query(conn, qu)
//   .catch((err) => { res.status(400).json(err); })
//   res.send(result);
// });




//------------- NEW APIs for NEW Schema -----------------------------------

route.post("/CreateDB", async (req,res) =>{
  const { orgName } = req.body;
  dbName = orgName;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "Create Database "+orgName)
  .catch((err) => {res.status(400).send(err);})
  res.json({ Message: 'Created Database' });
});

route.post("/createScreen", async (req,res) =>{
    const conn = await connection().catch(e => {});
    const result = await query(conn,"CREATE TABLE IF NOT EXISTS "+dbName+".`screen` (`ScreenID` varchar(40) NOT NULL,`ScreenName` varchar(45) NOT NULL,`Date` datetime NOT NULL,`CreatedBy` varchar(45) NOT NULL,`Display` varchar(20) NOT NULL,`Modified` varchar(20) NOT NULL, PRIMARY KEY (`ScreenID`))")
    .catch((err) => {res.status(400).send(err);})
    res.json({ Message: 'Created Screen table' });
  });
  
  route.post("/postScreen", async (req, res) => {
    //console.log(req.body)
    const {ScreenID,ScreenName,Date,CreatedBy, Display,Modified} = req.body;
    const conn = await connection().catch(e => { });
    const result = await query(conn, "INSERT INTO "+dbName+".`screen` VALUES (?, ?, ?, ?, ?, ?)",
    [ScreenID, ScreenName, Date, CreatedBy, Display, Modified]).catch((err) => { res.status(400).send(err); })
    res.json({ Message: 'Received Screen Data' });
  });

route.post("/createForm....", async (req, res) => {
  const conn = await connection().catch(e => { });
  const result = await query(conn, "CREATE TABLE IF NOT EXISTS "+dbName+".`Form` (`FormID` varchar(30) NOT NULL,`FormName` varchar(40) NOT NULL,`Date` datetime NOT NULL,`AdminID` varchar(45) NOT NULL,`Display` varchar(20) NOT NULL,`Modified` varchar(20) NOT NULL, PRIMARY KEY (FormID))")
  .catch((err) => { res.status(400).send(err); })
  res.json({ Message: 'Created Form table',Results:result });
});

route.post("/postForm....", async (req, res) => {
  const {FormID,FormName, Date,AdminID,Display,Modified} = req.body;
  const conn = await connection().catch(e => { });
  const result = await query(conn, "INSERT INTO "+dbName+".`Form` (?,?,?,?,?,?)",
  [FormID,FormName,Date,AdminID,Display,Modified])
  .catch((err) => { res.status(400).send(err); })
  res.json({ Message: 'Inserted in Form table' });
});

route.post("/createFormField....", async (req, res) => {
  const conn = await connection().catch(e => { });
  const result = await query(conn, "CREATE TABLE IF NOT EXISTS "+dbName+".`FormField` (`FieldID` varchar(30) NOT NULL,`FormID` varchar(30) NOT NULL,`FieldJSON` json NOT NULL)")
  .catch((err) => { res.status(400).send(err); })
  res.json({ Message: 'Created FormField table' });
});

route.post("/postFormField....", async (req, res) => {
  const {FormField,FormID, FieldJSON} = req.body;
  const conn = await connection().catch(e => { });
  const result = await query(conn, "INSERT INTO "+dbName+".`FormField` (?,?,?)",[FormField,FormID,FieldJSON])
  .catch((err) => { res.status(400).send(err); })
  res.json({ Message: 'Inserted in FormField table' });
});







// ------------   OLD APIs (Use them as needed)  ----------------------------------------------

// //Dynamic Table Creation
// route.post("/createForm", async (req, res) => {
//   const {formID,labels} = req.body;
//   var qu = "CREATE TABLE IF NOT EXISTS "+dbName+".`"+formID+"` (";
//   for(var i=0;i<labels.length;i++)
//   {
//     qu = qu+labels[i]+" varchar(50) DEFAULT NULL,";
//   }
//   qu = qu.slice(0,-1)
//   qu = qu+");";

//   //console.log(qu);
//   const conn = await connection().catch(e => { });
//   const result = await query(conn, qu)
//   .catch((err) => { res.status(400).send(err); })
//   res.status(200).json({ Message: 'Created Form table' });
// });


// //Dynamic Table Insertion
// route.post("/postForm", async (req, res) => {
//   //console.log(req.body)
//   const {dbName,formID,values,labels} = req.body;
//   var qu = "INSERT INTO "+dbName+".`"+formID+"` ( ";

//   for(var i=0;i<labels.length;i++)
//   {
//     qu = qu+labels[i]+',';
//   }
//   qu = qu.slice(0,-1)
//   qu = qu+") ";

//   qu = qu + "VALUES(";
//   for(var i=0;i<values.length;i++)
//   {
//     qu = qu+'"'+values[i]+'",';
//   }
//   qu = qu.slice(0,-1)
//   qu = qu+");";

//   console.log(qu);
//   const conn = await connection().catch(e => { });
//   const result = await query(conn, qu)
//   .catch((err) => { res.status(400).send(err); })
//   res.status(200).json({ Message: 'Posted Form Data' });
// });


// route.post("/putCols", async (req, res) => {
//   const {dbName,formID,labels} = req.body;
//   const conn = await connection().catch(e => { });
//   const result = await query(conn, "Show columns from "+dbName+"."+formID)
//   .catch((err) => { res.status(400).json(err); })
//   var existingCols = []
//   result.map((obj)=>{existingCols.push(obj["Field"])})
  
//   var qu = "Alter Table "+dbName+"."+formID+" ";
//   for(var i=0;i<labels.length;i++)
//   {
//     if(!existingCols.includes(labels[i]))
//     {
//       qu = qu + "Add "+labels[i]+" varchar(50) DEFAULT NULL,";
//     }
//   }
//   qu = qu.slice(0,-1);
//   qu = qu + ";";

//   console.log(qu);
//   const ans = await query(conn, qu)
//   .catch((err) => { res.status(400).json(err); })
//   res.json({Message:"Altered Table"});
// });


// route.get("/getform", async (req,res) => {
//   const conn = await connection().catch(e => {});
//   const results = await query(conn,'SELECT formJSON FROM form').
//   catch((err) => { res.status(400).json(err);})
//   res.status(200).send(results);
// });

// route.post("/postform", async (req,res) =>{
//   //console.log(req.body)
//   const { id,formJSON } = req.body;
//   const conn = await connection().catch(e => {});
//   const result = await query(conn, "INSERT INTO "+dbName+".`form` (id, formJSON) VALUES (?, ?)",
//   [id, formJSON]).catch((err) => {res.status(400).send(err);})
//   res.status(200).json({ Message: 'Got it' });
// });


route.post("/DropTable", async (req,res) =>{
  //console.log(req.body)
  const { name } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "DROP Table "+dbName+"."+name).
  catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Dropped Table' });
});

route.post("/DropDatabase", async (req,res) =>{
  const { name } = req.body;
  const conn = await connection().catch(e => {});
  const result = await query(conn, "DROP Database "+name).
  catch((err) => {res.status(400).send(err);})
  res.status(200).json({ Message: 'Dropped Table' });
});


module.exports = route