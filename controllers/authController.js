import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../config/generateToken.js";
import jwt from 'jsonwebtoken'

const authCtrl = {
  accessUser: async (req, res) => {
    try {
      const token = req.headers.authorization;
    
      if(!token) return res.status(400).json({msg: "Please login now!"})
      
      const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)

      if(!decoded.user._id) return res.status(400).json({msg: "Please login now!"})

      const user = await Users.findById(decoded.user._id).select("-password")
      const access_token = generateAccessToken({user})

      res.status(201).json({user, token: access_token});

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      const existUser = await Users.findOne({ email });

      if (existUser) return res.status(400).json({ msg: "Email already exists." });

      const passwordHash = await bcrypt.hash(password, 12);

      if(role === 'customer'){
        const user = new Users({ name, email, password: passwordHash, role });
        await user.save();
        const token = generateAccessToken({user: user})
        res.status(201).json({user: user, token});
      }else{
        const user = new Users({ name, email, password: passwordHash, role, store: `${name}'s shop` });
        await user.save();
        const token = generateAccessToken({user})
        res.status(201).json({user, token});
      }

      

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user) return res.status(400).json({ msg: "No user found" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ msg: "Password is wrong" });

      const token = generateAccessToken({user})

      res.status(201).json({user, token});

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
export default authCtrl;
