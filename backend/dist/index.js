import express from 'express';
import connectDB from './config/connect.js'; // your connection file
import pageRoutes from './routes/pageRoutes.js';
const app = express();
app.use(express.json());
connectDB();
app.use('/api/pages', pageRoutes);
app.get('/', (req, res) => {
    res.send('Server is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map