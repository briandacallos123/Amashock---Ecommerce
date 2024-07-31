
import userModel from '../model/userModel.js';
import { comparePassword, hashPass } from '../utils/passwordHelper.js';
import { createJWT } from '../utils/tokenUtils.js';


export const register = async(req, res) => {
    const hashedPass = await hashPass(req.body.password)
    req.body.password = hashedPass
    const user = await userModel.create({...req.body});
    res.status(200).json({user})
}

export const login = async(req, res) => {
    const isExists = await userModel.findOne({email:req.body.email});

    if(!isExists) return res.status(404).json({msg:"not exists"});
    const matchedPass = await comparePassword(req.body.password, isExists.password);
    if(!matchedPass) return res.status(404).json({msg:"not exists"});

    const token = createJWT({userId:isExists?._id, role:isExists?.role})
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly:true,
        expiresIn:new Date(Date.now() + oneDay),
        secure:process.env.NODE_ENV === 'production'
    })
    res.status(200).json({msg:"logged in"})

}