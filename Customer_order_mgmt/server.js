import express from "express";
import dotenv from "dotenv";
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});