const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas del proyecto

const userRoute = require("./routes/usersRoutes");
app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port} ✅`);
});
