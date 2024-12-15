import express from 'express';

const app = express();

app.get("/ping", (req, res)=>{
    console.log(res);

    res.send("pong")
})

app.listen(5001, ()=>{
    console.log('Server is running on port http://localhost $(PORT)');
    
});