import express from 'express';

const app = express();

app.get("/ping", (req, res)=>{
    console.log(res);

    res.send("pong")
})

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});