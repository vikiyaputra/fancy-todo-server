require('dotenv').config()
const express = require(`express`)
const app = express()
const router = require(`./routes/routes.js`)
const port = 3000
const { errorHandler } = require('./middlewares/errorHandler.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(`/`, router)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`liseting on port ${port}`);
})