import { Router } from 'express'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const generateToken = (userObj) => {
    const token = jwt.sign(userObj, process.env.JWT);
    return token;
}

import User from '../mongodb/models/user.js'

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from DALL-E User');
})

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userData = await User.findOne({ email });
        if(userData){
            return res.status(409).json({
                success: false,
                message: 'User with this email id is already present!'
            });
        }

        const newUser = await User.create({
            name, email, password
        })

        const token = generateToken({
            email,
            _id: newUser._id
        })
        res.status(200).json({ success: true, message: 'Signup successful', name, token});
    } catch (err) {
        res.status(500).json({ success: false, message: err.message});
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        if(!userData){
            return res.status(400).json({
                success: false,
                message: 'No such user exists!'
            });
        }
        if(userData.password !== password){
            return res.status(401).json({
                success: false,
                message: 'Incorrect password!'
            });
        }

        const token = generateToken({
            email,
            _id: userData._id
        })

        res.status(200).json({ success: true, message: 'Login successful', name: userData.name, token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message});
    }
})

export default router;