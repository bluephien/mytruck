const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  truck: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  aggregates: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)