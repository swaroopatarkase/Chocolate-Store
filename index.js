import express from 'express';

const app = express();

app.get("/ping", (req, res)=>{
    console.log(res);

    res.send("pong")
})

const CHOCOLATES = [
    {
      id: 1,
      name: "Dairy Milk",
      description: "Creamy milk chocolate",
    },
    {
      id: 2,
      name: "KitKat",
      description: "Crispy wafer chocolate",
    },
    {
      id: 3,
      name: "Ferrero Rocher",
      description: "Hazelnut chocolate ball",
    },
    {
      id: 4,
      name: "Galaxy",
      description: "Smooth and creamy chocolate",
    },
    {
      id: 5,
      name: "Snickers",
      description: "Peanut and caramel chocolate bar",
    },
  ];
  

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});