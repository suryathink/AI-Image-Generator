import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import User from '../mongodb/models/user.js'

const authorize = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        let token = authorization && authorization.split(' ').pop();
        if(!token) {
            return res.status(401).json({ success: false, message: 'Kindly login and comeback!'})
        }
        let userData = jwt.verify(token, process.env.JWT);
        let user = await User.findOne({ _id: userData._id, email: userData.email});

        req.user = user;
        // console.log("Inside authorization");
        next();
    } catch (err) { 
        res.status(401).json({ success: false, message: 'Unauthorized user'})
    }
}

export default authorize;