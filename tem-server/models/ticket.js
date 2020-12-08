const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  contents: [
    {
      text: {
        type: String,
        required: true
      },
      sender: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    }
  ],
  status: {
    type: Number,
    required: true
  },
  importance: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);