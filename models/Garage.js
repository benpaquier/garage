const { Schema, model } = require("mongoose")

const GarageSchema = Schema({
  name: String,
  cars: [
    { type: Schema.Types.ObjectId, ref: "Car" }
  ]
})

const Garage = model("Garage", GarageSchema)

module.exports = Garage
