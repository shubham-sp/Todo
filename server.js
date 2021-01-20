const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

//init middleware
app.use(express.json({ extended: false }));     //to get req.data in route files


app.get('/', ()=>console.log("APP Running..."))
const PORT = process.env.PORT || 5000;
//define routes
app.use('/api/todo', require("./routes/api/todo"));
app.use('/api/user', require("./routes/api/user"));

app.listen(PORT, ()=> console.log(`Running..${PORT}`));
