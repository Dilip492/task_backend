const express = require("express")
const app = express();
const { Roles } = require('./Constants/roles')
const cookieParser = require("cookie-parser");


const port = 8000;


const connectTodb = require("./db")


connectTodb();




app.use(express.json())
app.use(cookieParser());



app.use("/api", require('./Routes/Users'))
app.use("/api/role", require('./Routes/Rolebase.route'))


app.get('/', (req, res) => {

    res.json({ "message": "hello server is running..." })

})

app.get('*', (req, res) => {
    res.send(`can't find  ${req.originalUrl} on this server`);
})


app.listen(port, () => {

    console.log(`Server is running on ${port}`)
})


