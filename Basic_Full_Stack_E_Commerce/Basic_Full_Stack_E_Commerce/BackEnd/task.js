const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");
const purchaseRoutes = require("./src/routes/purchase");
const authRoutes = require("./src/routes/authRouter");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

    
app.use("/api", require("./src/routes/authRouter"));
app.use('/api', require('./src/routes/product'));
app.use('/api', require('./src/routes/purchase'));
app.use("/api/purchase", purchaseRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
