const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")

router.post('/', (req,res)=>{
    const user = {
        id: 1,
        username:"Hamza",
        email: "h@h.com"
    }
    jwt.sign({user}, process.env.JWT_SECRET_KEY, (err, token)=>{
        res.status(200).json({token})
    })
})

module.exports = router