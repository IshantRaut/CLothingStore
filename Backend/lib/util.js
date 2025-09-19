import jwt from 'jsonwebtoken';
import { redis } from './redis';
export const generateToken = (userId,res) => {

  const accessToken = jwt.sign({id:userId},process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:'1d',
  })

  const refreshToken = jwt.sign({id:userId},process.env.REFRESH_TOKEN_SECRET,
    {
    expiresIn:'7d',
    })


   return(accessToken,refreshToken);
}
export const storeRefreshToken = async (userId,refreshToken) => {
    await redis.set(`refreshToken:${userId}`, refreshToken,"EX", 7 * 24 * 60 * 60); // Set expiration to 7 days
}

export const setCookies = (res, accessToken, refreshToken) => { 

  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent CSRF attack, cross site request forgery attack
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie ("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent CSRF attack, cross site request forgery attack
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};