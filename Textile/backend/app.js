const express = require('express')

const app = express()
const Error = require('./middleware/error')
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, 'config/config.env') })

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
const router = require('./routes/productsRouter')
const authRouter = require('./routes/authRouter')
const orderRouter = require('./routes/orderRoute')
const paymentRouter = require('./routes/paymentRouter')

app.use('/api/v1', router)
app.use('/api/v1', authRouter)
app.use('/api/v1', orderRouter)
app.use('/api/v1', paymentRouter)

// if(process.env.NODE_ENV ==='production'){
//     app.use(express.static(path.join(__dirname,'../frontend/build')));
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
//     })
// }
app.use(Error)
module.exports = app
