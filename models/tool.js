const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,  // hammer, screw driver, flashlight .....
    required: true,
  },
  picture: {
    type: String,  
    required: true,
  },
  whereToBuy: {
    type: String,  
    required: true,
  },
  recommended: Boolean,
},
{ timestamps: true }
);

module.exports = mongoose.model('Tool', toolSchema);