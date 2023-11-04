// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (make sure you have your MongoDB URI here)
mongoose.connect("mongodb://localhost:27017/liveSearch", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Create a Product model
const Product = mongoose.model("Product", {
  name: String,
  description: String,
  // ... other product fields
});

// Define a route for searching products
app.get("/api/products/search", async (req, res) => {
  const query = req.query.query; // Get the search query from the request query parameters
  console.log(req.query.query);

  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive search
    }).limit(10);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
