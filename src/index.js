require('dotenv').config()
import express from 'express'
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import auth from './routes/auth';
import users from './routes/users';
import books from './routes/books';

let port = process.env.PORT 

const app = express();

//mongoose.connect("mongodb://localhost/book");

//MongoDB Atlas connection setting
const connStr = process.env.DATABASE_URL
    .replace('<password>',process.env.DATABASE_PWD)
    .replace('<database>',process.env.DATABASE_NAME)
mongoose.connect(connStr,{
                          useCreateIndex:true,
                          useNewUrlParser: true,
                          useUnifiedTopology: true,
                          useFindAndModify:false
                         })
const db = mongoose.connection
db.on('error',()=>console.log('Database connection error'))
db.once('open', ()=> console.log('Database connected'))


app.use(bodyParser.json());

app.use("/api/auth",auth);
app.use("/api/users",users);
app.use("/api/books", books);

// app.post('/api/auth',(req,res)=>{
//     res.status(400).json({errors:{global:"Invalid credentials"}});
// });

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(port,()=>console.log("Running on localhost:8080"));