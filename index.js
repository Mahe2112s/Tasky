const express = require("express");

const port = 8081;

const app = express()
app.use(express.json());

const toDoList = ["apply","happy","Do","Win"];
let len = toDoList.length;
console.log(len);

app.get("/todos",(req,res) =>{
    // res.writeHead(200);
    // res.write(toDoList);
    res.status(200).send(toDoList);
});

app.post("/todos",(req,res) => {
    let newItem = req.body.name;
    toDoList.push(newItem);
    res.status(201).send({message : "Task added successfully"});
});

app.delete("/todos",(req,res) =>{
    let deleteItem = req.body.name;
    let ItemDeleted = false;
    toDoList.find((ele,Index) => {
        if(ele === deleteItem){ 
            toDoList.splice(Index,1);
            ItemDeleted = true;

        }
        res.status(202).send( ItemDeleted === true
            ? {message : `Deleted ${deleteItem}`}
            : {message : "Match Not Found"});
    });
   
});

app.all("*" , (req,res) => {
    res.status(501).send();
});

app.listen(port,() => {
    console.log(`Node server started running on port http://localhost:${port}`);
});