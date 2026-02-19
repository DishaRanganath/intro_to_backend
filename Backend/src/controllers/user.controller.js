// controllers are the decision makers .they handles what reponse has to be sent to a request
import {User} from "../models/user_model.js";
const registerUser=async(req,res) =>{
    try {
        const {username,email,password}=req.body;
        //validation
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        //check if user already exists
        const existingUser=await User.findOne({email:email.toLowerCase()});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        //create a user
        const user=await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn: false,
        });
        res.status(201).json({message:"User registered successfully",user:{id: user._id,username: user.username,email: user.email}});
    } catch (error) {
        //console.log("Error in user registration",error);
        res.status(500).json({message:"Internal server error",error:error.message});
        
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


    export {registerUser,loginUser,logoutUser};