const path = require("path")
const express = require("express")
const cors = require('cors')
const app = express()
app.use(cors())

LOGGING = 'debug'
const HTTP_PORT = 8000
const tag = "[Server]"

function run() {
    app.use(express.static("."))
    app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "./client/index.html")))
    app.get("/index.js", (req, res) => res.sendFile(path.resolve(__dirname, "./client/index.js")))
    app.get("/csv.js", (req, res) => res.sendFile(path.resolve(__dirname, "./client/csv.js")))
    app.get("/boosted.csv", (req, res) => res.sendFile(path.resolve(__dirname, "./data/boosted.csv")))
    app.get("/event_tracker.csv", (req, res) => res.sendFile(path.resolve(__dirname, "./data/event_tracker.csv")))
    app.listen(HTTP_PORT, () => console.log(`${tag} HTTP listening at http://localhost:${HTTP_PORT}`))
}
run()
module.exports = { run }