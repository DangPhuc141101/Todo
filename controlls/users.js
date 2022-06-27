const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

const generateTokens = (user) => {
    const {id, username} = user;
    const accessToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30s'
    });

    const refreshToken = jwt.sign({id, username}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1h'
    });

    return {accessToken, refreshToken};
}

module.exports.createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const salt = await bcrypt.genSaltSync(12);
        const hash = await bcrypt.hash(password, salt);
        const user = new User({ email, username, salt, hash });
        await user.save();

        // Create JWT
        const tokens = generateTokens(user);
        
        return res.status(200).send({
            sucess: true,
            message: 'Login sucessfully',
            tokens: tokens
        })

    } catch (error) {
        res.status(403).json(error);
    }
}

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(403).json("User not found");

    const result = await bcrypt.compare(password, user.hash);
    if (!result) {
        res.status(402).send({
            sucess: false,
            message: "Incorrect password"
        })
    }

    // Create JWT
    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();
    return res.status(200).json({
        sucess: true,
        message: 'Login sucessfully',
        tokens: tokens
    })
}

module.exports.logout = async(req, res) => {
    const user = await User.findById(req.userId);
    user.refreshToken = null;
    await user.save();
    res.status(204);
}

module.exports.getToken = async(req, res) => {
    const refreshToken = req.body.refreshToken;
   
    if (!refreshToken) return res.status(401);

    const user = await User.findOne({refreshToken});
    if (!user) return res.status(403).json('User not found');

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        const tokens = generateTokens(user);
        // Update refresh token
        user.refreshToken = tokens.refreshToken;
        await user.save();
        return res.status(200).json({
            sucess: true,
            message: 'Login sucessfully',
            tokens: tokens
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
} 