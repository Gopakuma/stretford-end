import bcrypt from 'bcrypt';
import config from 'config';
import User from '../Database/models/User.js';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import axios from 'axios';

const auth: any = config.get("auth");

const bcryptConfig: any = config.get('bcrypt');
const { saltRounds } = bcryptConfig;


export const hashPassword = async (user: User) => {
    try {
        return await bcrypt.hash(user.password, saltRounds);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const checkHashPassword = async (user: User, storedHash: string) => {
    try {
        return bcrypt.compare(user.password, storedHash);
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const generateToken = (userId: number): string => {
    return jwt.sign({ id: userId }, auth.JWT_SECRET, { expiresIn: auth.JWT_EXPIRES_IN || "1h" });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, auth.JWT_SECRET);
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const callNodeMailerService = (userDto: User) => {
    const transporter = nodemailer.createTransport({
        host: 'live.smtp.mailtrap.io',
        port: 587,
        secure: false, // use SSL
        auth: {
            user: 'smtp@mailtrap.io',
            pass: '15d96ec78ec9fd6badac06047be16645',
        }
    });



    // Configure the mailoptions object
    const mailOptions = {
        from: 'hello@demomailtrap.co',
        to: userDto.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    // Send the email
    transporter.sendMail(mailOptions);
}

export const getData = async () => {

    const options = {
        method: "GET",
        url: "https://api.football-data.org/v4/competitions/PL/teams",
        headers: {
            "X-Auth-Token": "fb17a2d75bd7416aa7de8809670af021",
            "Accept": "application/json",
            "Content-Type": "application/json",

        },
    };
    const data: any = await axios.request(options);
    const manUnitedData = data.data.teams.filter(a => a.name == 'Manchester United FC')
    console.log(manUnitedData);
}