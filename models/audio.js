const mongoose = require('mongoose');

// Audio Schema
const AudioSchema = mongoose.Schema({
  name: String,
  duration: Number
});

const Audio = mongoose.model('Audio', AudioSchema);
module.exports = Audio;