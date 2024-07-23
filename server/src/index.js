import express from 'express';
import {Keys} from './models/index.js';
import {authRoutes} from './routes/auth.js';
import './middlewares/passport-middleware.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';
import { shipmentRoutes } from './routes/shipment.js';
import { bidsRoutes } from './routes/bids.js';
import { truckRoutes } from './routes/truck.js';


const app= express();
const PORT = Keys.PORT;
const CLIENT_URL=Keys.CLIENT_URL;

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize())

app.use('/api',authRoutes);
app.use('/api',shipmentRoutes);
app.use('/api',bidsRoutes);
app.use('/api',truckRoutes);

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