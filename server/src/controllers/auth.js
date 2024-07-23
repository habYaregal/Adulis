import { db } from "../db/index.js";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { Keys } from '../models/index.js';

const hash = bcryptjs.hash;
const sign = jsonwebtoken.sign;
const SECRET = Keys.SECRET;

export const getUsers = async (req, res) => {
  try {
    const email = req.user.email;
    const response = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    res.json(response.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, firstName, number, lastName, region, city, userType, tinNumber } = req.body;
    const hashedPassword = await hash(password, 10);
    
    // Insert user data into the users table
    await db.query(
      "INSERT INTO users (email, password, username, phone_number, user_type) VALUES($1, $2, $3, $4, $5)", 
      [email, hashedPassword, firstName, number, userType]
    );
    
    // Retrieve the newly created user ID
    const userResult = await db.query('SELECT id, email, username, phone_number, user_type FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];
    
    // Insert additional data based on user type
    if (userType === 'shipper') {
      await db.query(
        "INSERT INTO shippers (id, f_name, l_name, region, city) VALUES($1, $2, $3, $4, $5)", 
        [user.id, firstName, lastName, region, city]
      );
    } else {
      await db.query(
        "INSERT INTO carriers (id, f_name, l_name, region, city, tin) VALUES($1, $2, $3, $4, $5, $6)", 
        [user.id, firstName, lastName, region, city, tinNumber]
      );
    }
    
    return res.status(201).json({
      success: true,
      message: 'The registration was successful',
      data: user
    });
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: 'The registration was not successful'
    });
  }
};


export const login = async (req, res) => {
  let user = req.user;
  user.password = undefined;

  try {
    const token = sign({ id: user.id }, SECRET); // Include only user id in the token
    res.cookie('token', token, {
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: user // Include user data in the response
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
      info: 'Protected info',
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: 'Cannot log out now'
    });
  }
};
