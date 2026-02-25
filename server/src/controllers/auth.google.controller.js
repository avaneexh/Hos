import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.model.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: "Google token missing",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({
        error: "Google account email not found",
      });
    }

    let user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (user && !user.googleId) {
      user = await User.findByIdAndUpdate(
        user._id,
        {
          googleId,
          image: user.image || picture,
        },
        { new: true }
      );
    }

    if (!user) {
      user = await User.create({
        email: email.toLowerCase(),
        name,
        image: picture,
        googleId,
        role: "USER",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      success: true,
      message: "Google login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(401).json({
      error: "Google authentication failed",
    });
  }
};