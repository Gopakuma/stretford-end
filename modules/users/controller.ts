import { Request, Response } from "express";
import { User } from "../../Database/models/User"; // Adjust the import path as necessary

export const signup = async (req : Request, res : Response ) => {
  try {
    User.sync(); // Ensure the User model is synced with the database

    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        username: username,
        email: email,
      },
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this username or email",
      });
    }
    // Create new user
    const user = await User.create({
      username: username,
      email: email,
      password: password, // In a real application, hash the password before saving
    });

    // const hashedPassword = await bcrypt.hash(password, 10);
    // user.password = hashedPassword;
    // await user.save();
    // user.password = undefined; // Remove password from the response

    res.status(201).json({
      message: "User created successfully",
    //   user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
}