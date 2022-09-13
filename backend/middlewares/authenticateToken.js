const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next) => {
    try{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) return res.sendStatus(401)
    const verifyJwt = await jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!verifyJwt) return res.sendStatus(403)
    else next()
    }catch(e){
        res.status(401).json("Error" + e)
    }
}

module.exports = authenticateToken