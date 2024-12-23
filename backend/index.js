
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const productRoutes = require('./router/productRoutes');
const paymentRoutes = require('./router/paymentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Use payment routes
app.use('/api/payment', paymentRoutes);
app.use('/api/products', productRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(`Database connection failed: ${error}`));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
