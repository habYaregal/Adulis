import express from 'express';
import {Keys} from './models/index.js';
import {authRoutes} from './routes/auth.js';

const app= express();
const PORT = Keys.PORT;

app.use(express.json());
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