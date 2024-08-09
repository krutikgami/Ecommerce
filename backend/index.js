import express from 'express';
import connect_db from './db_connector.js';
import dotenv from 'dotenv';
import CartRoute from './routes/Addcart.route.js'
import userroutes from './routes/User.routes.js';
import Vendorroute from './routes/Vendor.routes.js'
import cors from 'cors'
import bodyParser from 'body-parser';
dotenv.config({
    path: '../.env'
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.json({ limit: '50mb' }));


app.use((req, res, next) => {
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});

connect_db()
    .then(() => {
        app.listen(3000, () => console.log('Server is running on port 3000'));
    })
    .catch((err) => console.log('Mongodb connection error', err));

app.use('/api/v1/users',CartRoute)
app.use('/api/v1/users', userroutes);
app.use('/api/v1/admin', Vendorroute);

