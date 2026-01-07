import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/db.js";          


import pkg from '@prisma/client';
const { UserRole } = pkg;



export const register = async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;

    if (!email || !password || !firstName || !phone) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    const ukPhoneRegex = /^(?:\+44|0)7\d{9}$/;

    if (!ukPhoneRegex.test(phone)) {
        return res.status(400).json({
            error: "Invalid UK phone number"
        });
    }

    const normalizedPhone = phone.startsWith("0")
        ? "+44" + phone.slice(1)
        : phone;

    const name = `${firstName} ${lastName || ""}`.trim();

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        const existingPhone = await prisma.user.findUnique({
            where: { phone: normalizedPhone }
        });

        if (existingPhone) {
            return res.status(400).json({
                error: "Phone number already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone: normalizedPhone,
                role: UserRole.USER
            }
        });

        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                phone: newUser.phone,
                role: newUser.role,
                image: newUser.image
            }
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "Error creating user"
        });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return res.status(401).json({
                error:"user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
             return res.status(401).json({
                error:"Invalid credentials"
            })
        }

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        }) 

         res.cookie("jwt", token, {
            httpOnly:true,
            sameSite:"none",
            secure:process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7, 
        })

        res.status(200).json({
         success:true,
         message:"User creatred successfully",
         user:{
            id:user.id,
            email:user.email,
            name:user.name,
            role:user.role,
            image:user.image
         }   
        })

    } catch (error) {
         console.error("Error Logging user:", error)
        res.status(500).json({
            error:"Error Logging User"
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly:true,
            sameSite:"none",
            secure:process.env.NODE_ENV !== "development"
        })

        res.status(201).json({
         success: true,
         message:"User logged out successfully",   
        })

    } catch (error) {
        console.error("Error Logging out user:", error)
        res.status(500).json({
            error:"Error Logging out User"
        })
    }
}

export const check = async (req, res) => {
    try {
        res.status(200).json({
         success:true,
         message:"User authenticated successfully",
         user:req.user
        })
    } catch (error) {
        console.error("Error checking user:", error)
        res.status(500).json({
            error:"Error checking User"
        })
    }
}