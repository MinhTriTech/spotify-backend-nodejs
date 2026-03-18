import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createAuthResponse = (user) => {
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    };
};

const buildUniqueUsername = async (baseName) => {
    const sanitized = baseName
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "")
        .slice(0, 20) || "spotifyuser";

    let candidate = sanitized;
    let suffix = 1;

    while (await User.findOne({ username: candidate })) {
        candidate = `${sanitized}${suffix}`;
        suffix += 1;
    }

    return candidate;
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingEmail = await User.findOne ({ email });

        if (existingEmail)
            return res.status(400).json({ message: "Email đã tồn tại" });

        const existingUsername = await User.findOne ({ username });

        if (existingUsername)
            return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Đăng ký thành công"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) 
            return res.status(400).json({ message: "Username không tồn tại"});

        if (!user.password)
            return res.status(400).json({ message: "Tài khoản này dùng đăng nhập Google" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res.status(400).json({ message: "Sai mật khẩu"});

        res.json(createAuthResponse(user));
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

export const loginWithGoogle = async (req, res) => {
    try {
        const { credential, accessToken } = req.body;

        if (!credential && !accessToken)
            return res.status(400).json({ message: "Thiếu Google token" });

        if (!process.env.GOOGLE_CLIENT_ID)
            return res.status(500).json({ message: "GOOGLE_CLIENT_ID chưa được cấu hình" });

        let profile;

        if (credential) {
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();
            profile = {
                email: payload?.email,
                sub: payload?.sub,
                name: payload?.name
            };
        } else {
            const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!response.ok)
                return res.status(401).json({ message: "Google access token không hợp lệ" });

            const userInfo = await response.json();
            profile = {
                email: userInfo?.email,
                sub: userInfo?.sub,
                name: userInfo?.name
            };
        }

        if (!profile?.email || !profile?.sub)
            return res.status(400).json({ message: "Google token không hợp lệ" });

        let user = await User.findOne({ email: profile.email });

        if (!user) {
            const username = await buildUniqueUsername(profile.name || profile.email.split("@")[0]);

            user = await User.create({
                username,
                email: profile.email,
                googleId: profile.sub
            });
        } else if (!user.googleId) {
            user.googleId = profile.sub;
            await user.save();
        }

        res.json(createAuthResponse(user));
    } catch (error) {
        res.status(401).json({ message: "Xác thực Google thất bại" });
    }
};