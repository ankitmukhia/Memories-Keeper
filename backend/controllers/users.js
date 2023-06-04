import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import userSchema from "../models/userSchema.js";

export const signin = async (req, res) => {
    
    const { email, password } = req.body; 

    try {
        const existingUser = await userSchema.findOne({ email });

        if(!existingUser) return res.status(404).send({ message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).send({ message: "Invalid credentials."})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, }, 'test', { expiresIn: "1h"})

        res.status(200).send({ result: existingUser, token});

    } catch (error) {
        
        res.status(500).send({ message: 'Something went wrong.'})
    }
};

export const signup = async (req, res) => {
    
    const { email, password, firstName, lastName, confirmPassword } = req.body; 
    // console.log(email, password, firstName, lastName, confirmPassword);

    try {
        const existingUser = await userSchema.findOne({ email });

        if(existingUser) return res.status(400).send({"message" : "Email already exists"})

        if(password !== confirmPassword) return res.status(404).send({ message: "Password don't match."})
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const result = await userSchema.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id, }, 'test', { expiresIn: "1h"});

        res.status(200).send({ result, token})
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong.'})
    }
};
