if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}


const express = require(`express`)
const app = express()
const router = require(`./routes/routes.js`)
const port = process.env.PORT || 3000
const cors = require(`cors`)
const { errorHandler } = require('./middlewares/errorHandler.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(`/`, router)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`liseting on port ${port}`);
})