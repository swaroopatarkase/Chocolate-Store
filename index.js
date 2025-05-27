import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const CHOCOLATES = [
  {
    id: 1,
    name: "Dairy Milk",
    description: "Creamy milk chocolate",
    price: "20",
  },
  {
    id: 2,
    name: "KitKat",
    description: "Crispy wafer chocolate",
    price: "20",
  },
  {
    id: 3,
    name: "Ferrero Rocher",
    description: "Hazelnut chocolate ball",
    price: "20",
  },
  {
    id: 4,
    name: "Galaxy",
    description: "Smooth and creamy chocolate",
    price: "20",
  },
  {
    id: 5,
    name: "Snickers",
    description: "Peanut and caramel chocolate bar",
    price: "20",
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

app.get("/chocolates/:id", (req, res) => {
  const { id } = req.params;
  const chocolate = CHOCOLATES.find((choc) => choc.id === parseInt(id));

  if (!chocolate) {
    return res.status(404).json({
      success: false,
      message: "Chocolate not found",
    });
  }

  res.status(200).json({
    success: true,
    data: chocolate,
    message: "Chocolate fetched successfully",
  });
});

app.post("/chocolates", (req, res) => {
  const { id, name, description, price } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }
  if (!name) {
    return res.status(400).json({ success: false, message: "Name is required" });
  }
  if (!description) {
    return res.status(400).json({ success: false, message: "Description is required" });
  }
  if (!price) {
    return res.status(400).json({ success: false, message: "Price is required" });
  }

  const existingChocolate = CHOCOLATES.find((choc) => choc.id === id);
  if (existingChocolate) {
    return res.status(400).json({
      success: false,
      message: "Chocolate with this ID already exists",
    });
  }

  const newChocolate = { id, name, description, price };
  CHOCOLATES.push(newChocolate);

  res.status(201).json({
    success: true,
    data: newChocolate,
    message: "Chocolate added successfully",
  });
});

app.put("/chocolates/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const chocolateIndex = CHOCOLATES.findIndex((choc) => choc.id === parseInt(id));

  if (chocolateIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Chocolate not found",
    });
  }

  CHOCOLATES[chocolateIndex] = { id: parseInt(id), name, description, price };

  res.status(200).json({
    success: true,
    data: CHOCOLATES[chocolateIndex],
    message: "Chocolate updated successfully",
  });
});

app.patch("/chocolates/name/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const chocolateIndex = CHOCOLATES.findIndex((choc) => choc.id === parseInt(id));

  if (chocolateIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Chocolate not found",
    });
  }

  CHOCOLATES[chocolateIndex].name = name;

  res.status(200).json({
    success: true,
    data: CHOCOLATES[chocolateIndex],
    message: "Chocolate name updated successfully",
  });
});

app.delete("/chocolates/:id", (req, res) => {
  const { id } = req.params;

  const chocolateIndex = CHOCOLATES.findIndex((choc) => choc.id === parseInt(id));

  if (chocolateIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Chocolate not found",
    });
  }

  CHOCOLATES.splice(chocolateIndex, 1);

  res.status(200).json({
    success: true,
    message: "Chocolate deleted successfully",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
