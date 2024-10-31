//netstat -ano
const http = require("http");

//For backend part we usually  uses 8081
const port = 8081;

// For front-end part we uses port 3000 
// const port = 3000;

const toDoList = ["learn", "apply things","succed"];

http.createServer((req,res) =>{
    const {method , url} = req;
 //   console.log(method , url);
    if(url === "/todos")
    {
        if(method === "GET"){
            res.writeHead(200);
            res.write(toDoList.toString());
        }
        else if(method === "POST")
        {
            let body = " ";
            req.on('error',(err) => {
                console.log(err);
            }).on('data',(chunks) => {
                body += chunks;
                console.log(chunks);
            }).on('end', () =>{
                body = JSON.parse(body);
                console.log("data: ",body);

                let newtoDo = toDoList;

                //here item is the key in the body.
                newtoDo.push(body.item);
            })
           
        }else if(method === "DELETE"){
            let body =" ";
            req.on('error' , (err) => {
                console.error(err);
            }).on('data', (chunks) =>{
                body += chunks;
            }).on('end', ()=>{
                body = JSON.parse(body);
                let delteThisItem = body.item;
                // for(let i=0;i<toDoList.length;i++)
                // {
                //     if(toDoList[i] === delteThisItem)
                //     {
                //         toDoList.splice(i,1);
                //         break;
                //     }
                // }
                toDoList.find( (ele ,index) => {
                    if(ele === delteThisItem) toDoList.splice(index,1);
                    else console.error("Match NOt Found");
                })
            })
        }
        else res.writeHead(501);
    }
    else{
        res.writeHead(404);
    }
    // res.writeHead(200,{"Content-Type": "text/html" });
    // res.write("<h2>Server Started at port 8081 :)</h2>");
    res.end();
})
    .listen(port, () =>{
        console.log(`Port Started at  http://localhost:${port}/`);
    });


//npm start since we gave the command in package.json as start in scripts.

//npm run Mahesh since we gave the command in package.json as Mahesh in scripts.









/* BASIC CREATION OF A SERVER
const http = require("http");

//For backend part we usually  uses 8081
const port = 8081;

// For front-end part we uses port 3000 
// const port = 3000;


http.createServer((req,res) =>{
    res.writeHead(200,{"Content-Type": "text/html" });
    res.write("<h2>Server Started at port 8081 :)</h2>");
    res.end();
})
    .listen(port, () =>{
        console.log(`Port Started at  http://localhost:${port}/`);
    });

*/