let express = require('express');
let cors = require('cors');
const AuthRouter = require('./routes/AuthRouting');
require('./db/dbConfig')

let app = express();
app.use(cors())
app.use(express.json());
app.use('/api/auth',AuthRouter)

app.listen(5000,()=>{
console.log("Server Started on Port No. 5000")
});