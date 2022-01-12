const { Schema, model } = require("mongoose")

const CarSchema = Schema({
  brand: String,
  // raccourci pour
  // { type: String }
  // ca marche seulement si on spécifie le type
  // et qu'il n'y a pas d'options
  model: String,
  year: Number,
  garage: { type: Schema.Types.ObjectId, ref: "Garage" }
}, {
  timestamps: true
})

const Car = model('Car', CarSchema)

module.exports = Car
