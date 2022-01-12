const express = require("express")
const app = express()

const Car = require("../models/Car")
const Garage = require("../models/Garage")

// Créer une voiture => POST (C de CRUD pour CREATE)
app.post('/', async (req, res) => {
  const { garage } = req.body

  try {
    const car = await new Car({ ...req.body })
    
    car.save(async (err, car) => {
      if (car) {
        // si ma voiture elle a un garage_id, 
        // je veux la relier au garage en question
        // pour ca il faut d'abord que je trouve le garage
        const getGarage = await Garage.findById(garage)
        getGarage.cars.push(car._id)
        getGarage.save()

        res.json(car)
        return
      }

      console.log(err)
      res.status(500).json({ error: err })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// Afficher toutes les voitures => GET (R de CRUD pour READ)
app.get('/', async (req, res) => {
  try {
    const cars = await Car.find()
      .populate('garage')
      .exec()

    res.json(cars)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// Afficher une seule voiture selon son id => (R de CRUD pour READ)
app.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    // equivalent a findOne({ _id: id })
    const car = await Car.findById(id)
      .populate('garage')
      .exec()

    res.json(car)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// Modifier une voiture => PUT (U de CRUD pour UPDATE)
app.put('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const car = await Car.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      // option qui renvoie la voiture a jour
      { new: true }
    ).exec()

    res.json(car)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// Effacer une voiture => DELETE (D de CRUD pour DELETE)
app.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Car.deleteOne({ _id: id }).exec()
    res.json({ success: 'Car deleted' })
    // const car = await Car.findByIdAndDelete(id)
    // res.json(car)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = app