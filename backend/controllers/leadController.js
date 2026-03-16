const Lead = require('../models/Lead');
const Note = require('../models/Note');

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Private (API Key)
 */
exports.createLead = async (req, res) => {
  try {
    const { name, phone, city, source, status } = req.body;

    const existingLead = await Lead.findOne({ phone });
    if (existingLead) {
      return res.status(409).json({ 
        message: 'Lead already exists', 
        leadId: existingLead._id 
      });
    }

    const lead = new Lead({ name, phone, city, source, status });
    await lead.save();

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get all leads with search and filtering
 * @route   GET /api/leads
 * @access  Private (JWT)
 */
exports.getLeads = async (req, res) => {
  try {
    const { search, status, source } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) query.status = status;
    if (source) query.source = source;

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get single lead details and associated notes
 * @route   GET /api/leads/:id
 * @access  Private (JWT)
 */
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const notes = await Note.find({ leadId: req.params.id }).sort({ createdAt: -1 });

    res.status(200).json({ lead, notes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Add a note to a specific lead
 * @route   POST /api/leads/:id/notes
 * @access  Private (API Key)
 */
exports.addNote = async (req, res) => {
  try {
    const { note_text } = req.body;
    const leadId = req.params.id;

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const note = new Note({
      leadId,
      note_text
    });

    await note.save();

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};