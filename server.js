import express from 'express'
import db from './config/db.js'
import cors from 'cors';
import school from './routes/school.js';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/schools', school);






app.get('/', (req, res) => {
    res.send('School API is running ');
});


const PORT = process.env.PORT||3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));