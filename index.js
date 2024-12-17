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
  

  app.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
    });
  });

  app.get("/chocolates", (req, res) => {
    res.status(200).json({
      success: true,
      data: CHOCOLATES,
      message: "Chocolates fetched successfully",
    });
  });

  app.post("/chocolates", (req, res) => {
    const { id, name, description } = req.body;
  
    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!description) {
      return res.status(400).json({ success: false, message: "Description is required" });
    }

    const existingChocolate = CHOCOLATES.find((choc) => choc.id === id);
  if (existingChocolate) {
    return res.status(400).json({
      success: false,
      message: "Chocolate with this ID already exists",
    });
  }

  const newChocolate = { id, name, description };
  CHOCOLATES.push(newChocolate);

  res.status(201).json({
    success: true,
    data: newChocolate,
    message: "Chocolate added successfully",
  });
});

app.put("/chocolates/:id", (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    
    const chocolateIndex = CHOCOLATES.findIndex((choc) => choc.id === parseInt(id));
  
    if (chocolateIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Chocolate not found",
      });
    }
  
    
    CHOCOLATES[chocolateIndex] = { id: parseInt(id), name, description };
  
    res.status(200).json({
      success: true,
      data: CHOCOLATES[chocolateIndex],
      message: "Chocolate updated successfully",
    });
  });
  

  

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});