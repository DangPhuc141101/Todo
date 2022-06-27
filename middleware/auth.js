const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
 
    if (!token) return res.status(401).send({message: 'Unauthorized'});

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decode.id;
        next();
    }
    catch(error){
        return res.status(403).send({message: 'Forbidden'});
    }
}

module.exports = verifyToken;