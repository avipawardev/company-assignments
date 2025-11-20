const jwt = require('jsonwebtoken')
const authMiddleware = async (req,res,next)=>{
try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Authorization header missing' });
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next()
} catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
}
}

module.exports = authMiddleware;