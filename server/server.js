const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const cors = require("cors");
dotenv.config({});

app.use(cors());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

// Start the server
// Create an Express application
const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
