const express = require("express")
const app = express()

const Garage = require("../models/Garage")
const Car = require("../models/Car")

app.post('/', async (req, res) => {
  try {
    const garage = await new Garage({ ...req.body })

    garage.save((err, garage) => {
      if (garage) {
        res.json(garage)
        return
      }

      console.log(err)
      res.status(500).json({ error: err })
    })
  } catch (error) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

app.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    // on utilise lean pour "lisser" notre objet de retour
    // de mongoose qui est bien plus complexe qu'il n'y
    // parait

    // SANS POPULATE
    // const garage = await Garage.findById(id).lean()
    // const cars = await Car.find({ garage_id: id })

    // console.log(garage)

    // const garageWithCar = {
    //   ...garage,
    //   cars: cars
    // }

    // res.json(garageWithCar)

    // AVEC POPULATE
    const garage = await Garage.findById(id)
      // populate va aller chercher tous les cars ids et trouver 
      // toutes les voitures qui correspondent
      // le parametre correspond a la clé qu'on a défini dans le schema
      // le deuxieme parametre permet de selectionner les champs
      .populate('cars', 'brand year model')
      .exec()

    res.json(garage)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = app