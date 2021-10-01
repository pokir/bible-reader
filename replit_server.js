// This is for keeping replit alive

const express = require("express")
const app = express()
const port = 8080

app.get("/", (req, res) => res.send("Your bot is alive!"))

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
