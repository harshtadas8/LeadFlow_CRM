const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true,
  },
  note_text: {
    type: String,
    required: true,
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Note', noteSchema);