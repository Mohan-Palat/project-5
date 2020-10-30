const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  name: {
    type: String, required: true,   // Ramona's toolbox ......
  },
  useType: {
    type: String, required: true, // homeowner, apt renter .....
  },
  tools: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tool',
    },
  ],
  
},
{ timestamps: true }
);

module.exports = mongoose.model('Box', boxSchema);