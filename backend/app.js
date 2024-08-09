import express from 'express';
import { UserSignup, UserLogin } from './controllers/User.controllers.js'; 
const app = express();


app.use(express.json({ limit: '50mb', extended: true }));


app.use((req, res, next) => {
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});

// Define routes
app.post('/signup', UserSignup);
app.post('/login', UserLogin);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
