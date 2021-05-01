const express = require('express')
const cors = require('cors')
const connectDB = require("./config/db")
const path = require('path')

const app = express()

connectDB()

app.use(cors())

app.use(express.json({extended:false}))

// define Routes
app.use('/api/user',require('./Routes/apis/user'))
app.use('/api/auth',require('./Routes/apis/auth'))
app.use('/api/profile',require('./Routes/apis/profile'))
app.use('/api/post',require('./Routes/apis/post'))

if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*' , (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000



