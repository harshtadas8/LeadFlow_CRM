import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

/**
 * Lead Detail view providing in-depth lead information, 
 * status management, and an interaction timeline.
 */
const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLeadData();
  }, [id]);

  /**
   * Retrieves lead details and associated interaction notes
   */
  const fetchLeadData = async () => {
    try {
      const response = await api.get(`/leads/${id}`);
      setLead(response.data.lead);
      setNotes(response.data.notes);
    } catch (err) {
      setError('Failed to load lead details.');
    }
  };

  /**
   * Updates lead status via PUT request
   */
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await api.put(`/leads/${id}`, { status: newStatus });
      setLead(response.data); 
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  /**
   * Submits a new interaction note to the lead's timeline
   */
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSubmitting(true);
    try {
      const response = await api.post(`/leads/${id}/notes`, 
        { note_text: newNote },
        { headers: { 'x-api-key': 'my_secret_key' } }
      );
      setNotes([response.data, ...notes]);
      setNewNote('');
    } catch (err) {
      setError('Failed to add note.');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Handles lead deletion with user confirmation
   */
  const handleDelete = async () => {
    if (window.confirm("Are you sure? This will permanently remove this lead and all history.")) {
      try {
        await api.delete(`/leads/${id}`);
        navigate('/'); 
      } catch (err) {
        setError('Failed to delete lead.');
      }
    }
  };

  if (!lead) return <div style={{ padding: '100px', textAlign: 'center', color: 'var(--text)' }}>Loading...</div>;

  return (
    <div style={{ marginTop: '20px', paddingBottom: '60px', textAlign: 'left' }}>
      <header style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>{lead.name}</h1>
            <p style={{ color: 'var(--text)', margin: '4px 0 0 0' }}>{lead.phone}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text)' }}>Status:</span>
            <select 
              value={lead.status} 
              onChange={(e) => handleStatusChange(e.target.value)}
              style={{ width: 'auto', padding: '6px 12px', borderRadius: '20px', fontWeight: '600' }}
            >
              <option value="new">New</option>
              <option value="follow_up">Follow Up</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </header>

      {error && <p style={{ color: 'var(--danger)', marginBottom: '20px' }}>{error}</p>}

      <div className="card" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text)', textTransform: 'uppercase' }}>City</label>
            <p style={{ margin: '4px 0 0 0', fontWeight: '500' }}>{lead.city || '-'}</p>
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text)', textTransform: 'uppercase' }}>Source</label>
            <p style={{ margin: '4px 0 0 0', fontWeight: '500', textTransform: 'capitalize' }}>{lead.source}</p>
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text)', textTransform: 'uppercase' }}>Created</label>
            <p style={{ margin: '4px 0 0 0', fontWeight: '500' }}>{new Date(lead.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '700px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Timeline & Notes</h3>
        
        <form onSubmit={handleAddNote} className="card" style={{ display: 'flex', gap: '10px', marginBottom: '30px', padding: '15px' }}>
          <input 
            type="text" 
            placeholder="Log an interaction..." 
            value={newNote} 
            onChange={(e) => setNewNote(e.target.value)} 
            required 
          />
          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ height: '38px', minWidth: '100px', backgroundColor: 'var(--accent)' }}>
            {submitting ? '...' : 'Add Note'}
          </button>
        </form>

        <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {notes.map(note => (
            <div key={note._id} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-27px', top: '8px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--bg)' }}></div>
              <div className="card" style={{ padding: '15px', boxShadow: 'none' }}>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-h)' }}>{note.note_text}</p>
                <small style={{ color: 'var(--text)', marginTop: '8px', display: 'block' }}>{new Date(note.createdAt).toLocaleString()}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '60px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
        <h4 style={{ color: 'var(--danger)', fontSize: '14px', marginBottom: '10px' }}>Danger Zone</h4>
        <button 
          onClick={handleDelete}
          className="btn" 
          style={{ backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', fontSize: '12px', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
        >
          Delete Lead Permanently
        </button>
      </div>
    </div>
  );
};

export default LeadDetail;