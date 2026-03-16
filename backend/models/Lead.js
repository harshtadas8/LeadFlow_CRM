const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: { 
  type: String, 
  required: true, 
  unique: true,
  match: [/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please fill a valid phone number']
},
  city: {
    type: String,
  },
  source: {
    type: String,
    enum: ['website', 'whatsapp', 'referral', 'ads', 'other'], 
    default: 'other'
  },
  status: {
    type: String,
    enum: ['new', 'follow_up', 'closed'],
    default: 'new' 
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Lead', leadSchema);