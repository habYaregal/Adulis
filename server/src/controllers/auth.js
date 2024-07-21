import { db } from "../db/index.js";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import {Keys} from '../models/index.js';

const hash = bcryptjs.hash;
const sign= jsonwebtoken.sign;
const SECRET = Keys.SECRET;

export const getUsers = async (req, res) => {
  try {
    const email=req.user.email;
    const response = await db.query("select * from users where email = $1",[email]);
    res.json(response.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, firstName,number,lastName,region,city,userType,tinNumber } = req.body;
    const hashedPassword= await hash(password,10);
    console.log(tinNumber);
    await db.query("insert into users (email,password,username,phone_number,user_type) values($1,$2,$3,$4,$5)",[email,hashedPassword,firstName,number,userType]);
    const user_id= await db.query('select id from users WHERE email = $1',[email]);
    if(userType==='shipper'){
        await db.query("insert into shippers (id,f_name,l_name,region,city) values($1,$2,$3,$4,$5)",[user_id.rows[0].id,firstName,lastName,region,city]);
    }else{
      await db.query("insert into carriers (id,f_name,l_name,region,city,tin) values($1,$2,$3,$4,$5,$6)",[user_id.rows[0].id,firstName,lastName,region,city,tinNumber]);
    }
    return res.status(201).json({
      sucess: true,
      message: 'the registration was sucessful'
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      sucess: false,
      message: 'the registration was not sucessful'
    })
  }
};

export const login = async(req,res)=>{
  let user= req.user;
  user.password = undefined;
  let payload={
    id: user.id,
    email: user.email,
    name: user
  }
  try {
    const token = jwt.sign(payload, SECRET);
    res.cookie('token', token, {
      // httpOnly removed for client-side access
    });
    res.status(200).json({
      success: true,
      message: 'Logged in successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};
export const protect = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const logout = async(req,res)=>{
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      sucess: false,
      message: 'can not logged out now'
    })
  }
}