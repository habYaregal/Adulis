import {check} from 'express-validator';
import { db } from "../db/index.js";
import bcryptjs from 'bcryptjs';

const compare = bcryptjs.compare;

const password = check('password').isLength({min: 6,}).withMessage('Password length must be grater than 6');
const email= check('email').isEmail().withMessage('please insert a valid email');
const emailExist= check('email').custom(
    async (value)=> {
        const {rows} = await db.query('select * from users WHERE email = $1',[value]);
        if (rows.length){
            throw new Error('email already exists');
        }
    }
);
const loginSuccess= check('email').custom(async(value,{req})=>{
    const user= await db.query('select * from users WHERE email = $1',[value]);

    if(!user.rows.length){
        throw new Error("email doesn't exists");
    }

    const validPassword = await compare(req.body.password,user.rows[0].password)

    if(!validPassword){
        throw new Error("password is not correct");
    }

    req.user=user.rows[0];
})

export const validation={
    loginValidation: [loginSuccess],
    registerValidation: [email, password,emailExist]
}