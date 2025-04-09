const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async(req,res)=>{
    try{
        const {name,email,password,skils} = req.body;

        const existingUSer = await User.findOne({email});
        if (existingUSer) {
            return res.status(400).json({message:"User already Exists.."});
        }
        const hasedPassword = await bcrypt.hash(password,10);

        const user = new User({name,email,password:hasedPassword,skils});
        await user.save();

        res.status(201).json({message:"User Registered successfully..."});

    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Credentails.."});

        const ismatch = await bcrypt.compare(password,user.password);
        if (!ismatch) return res.status(400).json({message:"Invalid Credentails.."});

        const token = jwt.sign({id:user._id},process.env.JWT_SECREAT,{expiresIn:'1d'});

        res.json({token,user:{id:user._id,name:user.name,email:user.email,skils:user.skils}});

    }catch(err){
        res.status(500).json({error:err.message});
    }
}