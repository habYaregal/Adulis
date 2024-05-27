import { db } from "../db/index.js";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import {Keys} from '../models/index.js';

const hash = bcryptjs.hash;
const sign= jsonwebtoken.sign;
const SECRET = Keys.SECRET;

export const getUsers = async (req, res) => {
  try {
    const response = await db.query("select email from example");
    res.send(response.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword= await hash(password,10);
    await db.query("insert into example (email,password) values($1,$2)",[email,hashedPassword]);
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

  let payload={
    id: user.id,
    email: user.email
  }
  try {
    const token = sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
    })
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      sucess: false,
      message: 'the registration was not sucessful'
    })
  }
};