import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js'

const app = express()

dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extented: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// app.use();

app.get('/', (req, res) => {
    res.send('API for shah-commerce')
})


// Routes
app.use('/api', routes)

// Database
import './config/database.js'


app.listen(process.env.PORT || 5000,()=>{
    console.log("Express server listening on port")
  });



