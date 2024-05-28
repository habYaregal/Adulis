import express from 'express';
import {Keys} from './models/index.js';
import {authRoutes} from './routes/auth.js';
import './middlewares/passport-middleware.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';


const app= express();
const PORT = Keys.PORT;
const CLIENT_URL=Keys.CLIENT_URL;

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize())

app.use('/api',authRoutes);

const appStart = () =>{
    try {
        app.listen(PORT, (res, req)=>{
            console.log(`your app is running on port ${PORT}`)
        })
        
    } catch (error) {
        console.log(`There is an error :${error.message}`)
    }
}


export default appStart;