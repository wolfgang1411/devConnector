const jwt = require("jsonwebtoken")
const config = require("config")
const { model } = require("mongoose")

module.exports = function (req,res,next){
    
    const token = req.header('x-auth-token')

    if (!token) return res.status(401).json({msg:"No Token , Authorization Denied"})

    try{

        const decode = jwt.verify(token,config.get('jwtSecret'))
        req.user = decode.id

    }catch (err){
    
        return res.status(401).json({msg:'Invalid Token'})
    }
    next()
}