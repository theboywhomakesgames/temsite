const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // 0 -> class of items , 1 -> class of classes
  type: {
    type: Number,
    required: true
  },
  picUrl: {
    type: String,
    required: true
  },
  list: [
    {
      type: String, // list of id s
      required: true  
    }
  ]
});

module.exports = mongoose.model('ItemClass' ,classSchema);