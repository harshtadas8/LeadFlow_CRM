const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead'); 
const { 
  createLead, 
  getLeads, 
  getLeadById, 
  addNote 
} = require('../controllers/leadController');

const auth = require('../middleware/auth');
const apiKey = require('../middleware/apiKey');

/**
 * Lead Management Routes
 */

// UI Routes: Protected by JWT authentication
router.get('/', auth, getLeads);
router.get('/:id', auth, getLeadById);

// Automation/External Routes: Protected by static API Key
router.post('/', apiKey, createLead);
router.post('/:id/notes', apiKey, addNote);

/**
 * @desc    Update lead details or status
 * @access  Private (JWT)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(updatedLead);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(400).json({ message: 'Error updating lead' });
  }
});

/**
 * @desc    Permanently delete a lead
 * @access  Private (JWT)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;