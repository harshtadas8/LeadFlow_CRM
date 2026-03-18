const Lead = require('../models/Lead'); 
const Note = require('../models/Note');
exports.createLead = async (req, res) => {
  try {
    const { name, phone, city, source, status } = req.body;

    // DEBUG: Check if data is actually reaching the backend
    console.log("Incoming Data:", req.body);

    // 1. Check for existing lead
    const existingLead = await Lead.findOne({ phone });
    if (existingLead) {
      return res.status(409).json({ 
        message: 'A lead with this phone number already exists.', 
        leadId: existingLead._id 
      });
    }

    const lead = new Lead({ name, phone, city, source, status });
    
    // 2. Attempt to save
    await lead.save();
    res.status(201).json(lead);

  } catch (error) {
    // 🔥 THE DEBUGGER: This prints the REAL error in your VS Code Terminal
    console.log("xxxxxxxxxxxxx BACKEND ERROR START xxxxxxxxxxxxx");
    console.error(error); 
    console.log("xxxxxxxxxxxxx BACKEND ERROR END xxxxxxxxxxxxx");

    // Handle Mongoose Validation Errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join('. ') });
    }

    // If it's not a validation error, send the raw error message to the frontend
    res.status(500).json({ 
      message: 'Backend Crash: ' + error.message 
    });
  }
};

/**
 * @desc    Get all leads with search and filtering
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
    res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};

/**
 * @desc    Get single lead details and associated notes
 */
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    const notes = await Note.find({ leadId: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ lead, notes });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving lead details', error: error.message });
  }
};

/**
 * @desc    Add a note to a specific lead
 */
exports.addNote = async (req, res) => {
  try {
    const { note_text } = req.body;
    const leadId = req.params.id;

    if (!note_text || note_text.trim() === "") {
      return res.status(400).json({ message: "Note text cannot be empty" });
    }

    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    const note = new Note({ leadId, note_text });
    await note.save();

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error saving note', error: error.message });
  }
};