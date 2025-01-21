import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Create JWT Token
const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Route for user login
const loginUser = async (req, res) => {
    try{

        const {email,password}=req.body;
        const user=await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: "User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch)
        {
            const token=createToken(user.id)
            res.json({success: true, token})
        }

        else{
            res.json({success: false, message: "Invalid credentials"})
        }


    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if any required field is missing
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Check if the password is strong enough
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Check if the email is valid
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Check if the user already exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const user = await newUser.save();

        // Create a token for the user
        const token = createToken(user.id);

        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


// Route for admin login
const adminLogin = async (req, res) => {
    try {

        const {email, password} = req.body
        if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD)
        {
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({ success: true, token})
        }

        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
        


    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
        
    }
};

// Export controllers
export { loginUser, registerUser, adminLogin };