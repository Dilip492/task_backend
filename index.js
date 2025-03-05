const express = require("express")
const app = express();


const port = 8000;


const connectTodb = require("./db")


connectTodb()

app.use(express.json())



app.use("/api", require('./Routes/Users'))


app.get('/', (req, res) => {

    res.json({ "message": "hello server is running..." })

})

app.get('*', (req, res) => {
    res.send(`can't find  ${req.originalUrl} on this server`);
})


app.listen(port, () => {

    console.log(`Server is running on ${port}`)
})


