const express = require("express")
const app = express()
const port = 5000
const mongoose = require("mongoose")

const carsRoutes = require("./routes/cars")
const garagesRoutes = require("./routes/garages")

const dbName = "garage-db"
const dbUrl = `mongodb://localhost:27017/${dbName}`

mongoose.connect(dbUrl)
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log(`Connection to ${dbName} established`)
})

app.use(express.json())

app.use('/cars', carsRoutes)
app.use('/garages', garagesRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
